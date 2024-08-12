namespace app.node;

entity Nodes {
    key nodeId:Integer;
    nodeTitle:String;
    nodeShape:String;
    nodeIcon:String;
    nodeStatus:String;
    nodeGroup:String;
    
}

entity Lines{
    lineFrom:String;
    lineTo:String;
}

entity Groups {
    key groupId:Integer;
    groupkey:String;
    groupTitle:String;
    groupIcon:String;
    groupStatus:String;

}