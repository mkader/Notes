//Add Nuget packges - Microsoft.Azure.Search, MS.Extensions.Configuration, MS.Extensions.Configuration.FileExtensions, MS.Extensions.Configuration.Json.
using Microsoft.Azure.Search;
using Microsoft.Azure.Search.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AzureSearchServiceConsole
{
    class Program
    {
        static string indexName = "accounts";
        static string serviceName = string.Empty;
        static string adminKey = string.Empty;
        static string queryKey = string.Empty;

        static void Main(string[] args)
        {
            //read azure appsetting key
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            IConfiguration config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", true, true)
                .Build();

            serviceName = config["Azure:SearchService:Name"];
            adminKey = config["Azure:SearchService:AdminKey"];
            queryKey = config["Azure:SearchService:QueryAPIKey"];

            //create Index
            //CreateIndex();

            //query index
            //QueryIndex();

            //Advanced Search Functionlaity - Synonyms
            //SynonymsSearch();

            //Advanced Search Functionlaity - scoring profile
            //Boosting();

            //Advanced Search Functionlaity - Suggestors
            //Suggestors();

            //Advanced Search Functionlaity - Facets
            Facets();

            Console.WriteLine("Hello World!");
        }


        //visit the site, azjobsdemo.azurewebsites.net ->  It's created by the Azure Search team
	    private static void Facets()
        {
            SearchServiceClient serviceClient = new SearchServiceClient(serviceName, new SearchCredentials(adminKey));

            var accountIndexDefinition = new Index
            {
                Name = indexName,
                Fields = FieldBuilder.BuildForType<Account>()
            };

            var suggestor = new Suggester("autoComplete");
            suggestor.SourceFields.Add("firstName");
            suggestor.SourceFields.Add("lastName");

            accountIndexDefinition.Suggesters = new List<Suggester>();
            accountIndexDefinition.Suggesters.Add(suggestor);

            serviceClient.Indexes.CreateOrUpdate(accountIndexDefinition);
            ISearchIndexClient indexClient = serviceClient.Indexes.GetClient(indexName);
            
            DocumentSearchResult<Account> results;

            try
            {
                SearchIndexClient queryClient = new SearchIndexClient(serviceName, indexName, new SearchCredentials(queryKey));

                //it's not working magically. If you look Account.cs, what we've done originally is add IsFacetable on Age and Balance
                SearchParameters searchParameters = new SearchParameters
                {
                    Facets = new List<string> { "balance", "age" }
                };

                //Look at the results, We get 2 facets & also the same time we get 17 results (the document has State California)
                //Look at the facets - the Key which is balance (10 records) and 10 records for the key age.it contains value and count, like age 22(count 3), age 25(count 2)
                results = indexClient.Documents.Search<Account>("CA", searchParameters);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Suggestors or  autocomplete or type aheads.
        private static void Suggestors()
        {
            SearchServiceClient serviceClient = new SearchServiceClient(serviceName, new SearchCredentials(adminKey));

            //Microsoft.Rest.Azure.CloudException: 'Fields that were already present in an index (firstName, lastName) cannot be referenced by a new suggester. 
            //Only new fields added in the same index update operation are allowed.'
            //Avoid the above exception & in order to make suggesters work, 
            //with the current version of Azure Search, there's a limitation, and it would not allow me to add that particular definition for the existing fields. 
            //It only allows me to do that for additional fields that I want to add.
            //Keep things simple, dlete our existing index, and then import the documennt, use CreateIndex();

            //After Delete, import documents, commented and re run to see the suggestor resutlts
            //if (serviceClient.Indexes.Exists(indexName)) serviceClient.Indexes.Delete(indexName);

            var accountIndexDefinition = new Index
            {
                Name = indexName,
                Fields = FieldBuilder.BuildForType<Account>()
            };

            //add the suggester code
            var suggestor = new Suggester("autoComplete");
            suggestor.SourceFields.Add("firstName");
            suggestor.SourceFields.Add("lastName");

            accountIndexDefinition.Suggesters = new List<Suggester>();
            accountIndexDefinition.Suggesters.Add(suggestor);

            serviceClient.Indexes.CreateOrUpdate(accountIndexDefinition);

            //ISearchIndexClient searchIndexClient = serviceClient.Indexes.GetClient(indexName);
            //ImportDocuments(searchIndexClient);

             try
            {
                //Add SuggestParameters.
                SuggestParameters suggestParameters = new SuggestParameters
                {
                    UseFuzzyMatching = true,
                    Top = 20
                };

                SearchIndexClient queryClient = new SearchIndexClient( serviceName, indexName, new SearchCredentials(queryKey));

                //call suggesterResults, or the autoComplete results. can parse in anything right now, pass Hug
                var suggestorResults = queryClient.Documents.Suggest("Hug", "autoComplete", suggestParameters);
                /*Keep in mind, it does not really have any scoring at all done right now. 
	            20 results
                    [0]->Hughes
                    [1]->Hughes
                    [2]->Hudson //seeing the fuzzy logic kick in
                    [3]->Hutchinson //seeing the fuzzy logic kick in
                    [4]->Huff //seeing the fuzzy logic kick in
                    [7]->Huffman //seeing the fuzzy logic kick in
                    [6]->Hunt //seeing the fuzzy logic kick in
                    [8]->Hurley //seeing the fuzzy logic kick in
                    [10]->Hull //seeing the fuzzy logic kick in
                    [12]->Huber
                    [16]->Hunter
                    [17]->Hurst
                    [18]->Hubbard
                    [19]->Humphrey
                - This a very easy way to create an autocomplete without having to do much work. */
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        //example that does boosting or scoring
        //Every item returned in search result happens to have a score associated with it.
        //Scoring refers to the competition of a search score for every item. 
        //Scoring algorithm is internal to search engines and is called the ranking algorithm.
        //Score of an item simply indicates it's relevance. 
        //The higher the score, the higher the relevancy of that item in that particular search.
        private static void Boosting()
        {
            SearchServiceClient serviceClient = new SearchServiceClient(serviceName, new SearchCredentials(adminKey));

            //For business needs, customize the search results instead of internal search enginer scoring. 
            //create a scoring profile. a scoring profile is part of the index definition 
            //and it needs the index definition to be updated if the index has already been created.
            //A scoring profile is composed of weighted fields, functions, and parameters.

            //use textWeights & assign weights to the fields that need to be scored higher and ranked higher than other fields. 
            //The score could be anything, it could be 1.2, 3.5, really doesn't matter.
            //The higher the score, the better it is for rating or scoring that particular field higher than others.
            
            //use firstName, assign score 2.The reason, in accounts.json, search "Huges", you can see, last name Hughes and also first name Hughes.
            //return the same query that gives us two records back, but the weight of firstName is two and the weight of lastName is five.
            //when I get the result, the last name Hughes will be higher than the first name Hughes.
            //So a very simple case just to demonstrate scoring, or boosting, in Azure search.
            var textWeights = new TextWeights();

            textWeights.Weights = new Dictionary<string, double>();
            textWeights.Weights.Add("firstName", 2);
            textWeights.Weights.Add("lastName", 5);

            //create the definition
            var accountIndexDefinition = new Index
            {
                Name = indexName,
                Fields = FieldBuilder.BuildForType<Account>()
            };

            //create a scoring profile, assign the weights 
            accountIndexDefinition.ScoringProfiles = new List<ScoringProfile>
            {
                new ScoringProfile
                {
                    Name = "boostLastName",
                    TextWeights = textWeights,
                    FunctionAggregation =ScoringFunctionAggregation.FirstMatching
                }
            };

            //update the current index
            serviceClient.Indexes.CreateOrUpdate(accountIndexDefinition);

            DocumentSearchResult<Account> results;

            try
            {
                //add search parameters
                SearchParameters parameters = new SearchParameters
                {
                    Select = new[] { "firstName", "lastName" }
                };

                parameters.ScoringProfile = "boostLastName";

                //make call to Azure search
                SearchIndexClient queryClient = new SearchIndexClient(serviceName, indexName, new SearchCredentials(queryKey));

                //search for Hughes and pass in the parameters. 

                //Case 1
                //Not using scoring profile (//parameters.ScoringProfile...), run the code.
                //These results could either be in order or completely out of order. 
                //You can see, te first one score of 1.97, which is definitely the higher one out of the two. 

                //Case 2
                //apply scoring profile (parameters.ScoringProfile = "boostLastName";), it actually boosts the last name higher than anything else.
                //If there is city, or age, or anything have the same exact "Huges" value, in that case first and last name will actually rank higher than even city
                //Look at the results, a score of 3.9, it's a big jump from 1.9 to 3.9. the first one last name score of 3.9 & second one first name score of 1.40
                results = queryClient.Documents.Search<Account>("Hughes", parameters);
            }
            catch (Exception ex)
            {
            throw ex;
            }
        }

        //There is no portal support for creating synonyms but you can use the REST API or .NET SDK.
        //USA, United States, United States of America => With the rule, a search query "USA" will expand to "USA" OR "United States" OR "United States of America".
        //Explicit mapping is denoted by an arrow "=>". Washington, Wash., WA => WA, search queries "Washington", "Wash." or "WA" will all be rewritten to "WA". 
        //Explicit mapping only applies in the direction specified and does not rewrite the query "WA" to "Washington" in this case.
        private static void SynonymsSearch()
        {
            //Microsoft.Rest.Azure.CloudException: 'Authorization failed.' - Don't use quary key, it's looking for admin key
            SearchServiceClient searchServiceClient = new SearchServiceClient(serviceName, new SearchCredentials(adminKey));

            //Format="solr", Only the 'solr' format is currently supported.
            //Add a synonym map - where accounts happens to be the index and then synonyms will be added using the map.
            var accountSynonymMap = new SynonymMap()
            {
                //give it any name
                Name = "city-state-synonym-map",
                //couple of ways to add Synonyms. 
                //Example something like "Cal, California, CA" - any time it looks for CA and there's a value called California, it will automatically replace that for it and 
                //it also means that if it's looking for CAL and the value happens to be CA it will still bring it back. synonym which works either left to right or right to left
                //Example, \nTexas => TX" - say Texas resolves to TX. synonym which works one way, means if you have Texas it will look for TX in the field, but not the other way around. 
                // So if you have TX it wouldn't look for Texas.
                Synonyms = "cal, california, CA\nTexas=>TX"
            };

            searchServiceClient.SynonymMaps.CreateOrUpdate(accountSynonymMap);

            Index index = searchServiceClient.Indexes.Get(indexName);
            index.Fields.First(f => f.Name == "state").SynonymMaps =  new[] { "city-state-synonym-map" };
            index.Fields.First(f => f.Name == "city").SynonymMaps =  new[] { "city-state-synonym-map" };

            //Microsoft.Rest.Azure.CloudException: 'The request is invalid. Details: index : Found 0 key fields in index 'accounts'. 
            //Each index must have exactly one key field.
            searchServiceClient.Indexes.CreateOrUpdate(index);

            SearchIndexClient queryClient = new SearchIndexClient(serviceName, indexName, new SearchCredentials(queryKey));

            DocumentSearchResult<Account> results;
            SearchParameters parameters = new SearchParameters
            {
                SearchFields = new[] { "state" },
                Select = new[] { "state", "firstName", "lastName" }
            };

            //query something with a synonym. - cal
            //lot of documents with CA, but not for CAL. So regular text search fails however we used a synonym, we should still get a result back. 
            //You can see the state coming back is CA, but what we're looking for is just CAL.
            results = queryClient.Documents.Search<Account>("cal", parameters);
        }

        private static void QueryIndex()
        {
            // using the query key. You can use the admin keys, but best practice use the query key because it's read only. 
            SearchIndexClient searchIndexClient = new SearchIndexClient(serviceName, indexName, new SearchCredentials(queryKey));
            DocumentSearchResult<Account> documentSearchResult;
            SearchParameters searchParameters = new SearchParameters()
            {
                //get the first name and the last name rather than getting an entire object.
                Select = new[] { "firstName", "lastName" }
            };
            documentSearchResult = searchIndexClient.Documents.Search<Account>("Hughes", searchParameters);

            searchParameters = new SearchParameters()
            {
                Filter = "age lt 45",
                Select = new[] { "age", "firstName", "lastName" }
            };
            //*-  Go and search everything 
            documentSearchResult = searchIndexClient.Documents.Search<Account>("*", searchParameters);

            searchParameters = new SearchParameters()
            {
                OrderBy = new[] { "state desc", "city" },
                Select = new[] { "state", "city", "firstName", "lastName" },
                Top = 10
            };

            //searching every field over there that's supposed to be searchable 
            //and the only fields that will be shown are the ones that are retrievable and also part of the select operator.
            documentSearchResult = searchIndexClient.Documents.Search<Account>("*", searchParameters);
        }

        private static void CreateIndex()
        {
            //Create Index
            //Initialize the SearchServiceClient with the searchServiceName & the Credentials with the adminKey
            SearchServiceClient searchServiceClient = new SearchServiceClient(serviceName, new SearchCredentials(adminKey));

            //Use the serviceClient to add an index. Check if the serviceClient has Indexers, if already exists then delete it.
            //we're going to be working with the same data set over and over again, so  we want exceptions
            //It's a good practice to check for exceptions while this is happening. This is for demo purpose only, don't do in prod other environment. 
            if (searchServiceClient.Indexes.Exists(indexName)) searchServiceClient.Indexes.Delete(indexName);

            //define the index & definition-> name and Fields (build the Field for our type)
            //- BuildForType utltity - will take the Account type, then create the fields we need for the index definition for index accounts, 
            //which is our index in ft-axure-search-service Azure Search instance.
            var accountIndexDefinition = new Index()
            {
                Name = indexName,
                Fields = FieldBuilder.BuildForType<Account>()
            };

            //create the index. Can use different definition like Create, CreateAsync, CreateOrUpdate, CreateOrUpdateAsync - all of them would have worked.
            searchServiceClient.Indexes.Create(accountIndexDefinition);

            //2 kinds of clients -  ISearchIndexClient & queryClient
            ISearchIndexClient searchIndexClient = searchServiceClient.Indexes.GetClient(indexName);

            //Utility to import all accounts.json file documents to our Azure Search instance of ft-azure-search-service.
            ImportDocuments(searchIndexClient);
        }

        //Utility to import all accounts.json file documents to our Azure Search instance of ft-azure-search-service.
        private static void ImportDocuments(ISearchIndexClient indexClient)
        {
            //Get a list of actions, which is part of Azure Search
            var actions = new List<IndexAction<Account>>();

            string line;

            //To read accounts.json data (it contain 1000 documents), there's no square brackets, all are separated by comma that means data isn't in an array.
            //use StreamReader to read the entire file line by line, take the JSON line, convert it into an actual object. Push the data over to Azure
            using (System.IO.StreamReader file = new System.IO.StreamReader("accounts.json"))
            {
                while ((line = file.ReadLine()) != null)
                {
                    JObject json = JObject.Parse(line);
                    Account account = json.ToObject<Account>();
                    //Different kinds of actions like  Upload, Merge, or even MergeOrUpload, Delete
                    actions.Add(IndexAction.Upload(account));
                }
                file.Close();
            }
            //Remember, bulk action can have about 1,000 actions as part of it, and not more than 1,000.
            //Make sure clear a new batch of actions. And then, we need to update the Azure Search instance with this new batch.
            var batch = IndexBatch.New(actions);

            try
            {
                indexClient.Documents.Index(batch);
            }
            catch (IndexBatchException ex)
            {
                throw ex;
            }
        }
    }
}
