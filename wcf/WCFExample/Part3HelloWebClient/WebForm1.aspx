<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="Part3HelloWebClient.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:TextBox ID="TextBox1" runat="server"/>
		    <asp:Button ID="Button1" runat="server" Text="Get Message" 	onclick="Button1_Click" />
		    <asp:Label ID="Label1" runat="server" Font-Bold="true"/>
        </div>
    </form>
</body>
</html>
