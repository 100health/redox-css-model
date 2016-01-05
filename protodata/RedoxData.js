


module.exports = {
    app:{
        init:function ( pd ) {
            // this.name = pd.db_random( "firstName" );
            // this.favorite_toy = pd.db_random( "noun" );

            /*this.cats = 	pd.generateArray(
                                    "cats" ,  pd.random( 7 , 13 ),
                                    this , "dog"
                                );*/

            this.main_pages = pd.generateArray( "main_page" , 3 );

            this.orig_main_pages = pd.generateArray( "orig_main_page" , 5 );

            this.organization_pages
                = pd.generateArray( "organization_page" , 4 );
        },
        root:true
    },
    main_page:{
        init:function ( pd , index , config_obj ) {
            var data_obj = config_obj.data[ index ];
            this.name = data_obj.name;
            this.link = data_obj.link;
            this.icon = data_obj.icon;
        },
        data:[
            {name:"Organization Name",icon:"ion-ios-browsers",link:"organization"},
            {name:"Documentation",icon:"ion-clipboard",link:"docs"},
            {name:"user@username.com",icon:false,link:"user_profile"}
        ]
    },
    orig_main_page:{
        init:function ( pd , index , config_obj ) {
            var data_obj = config_obj.data[ index ];
            this.name = data_obj.name;
            this.link = data_obj.link;
            this.icon = data_obj.icon;
        },
        data:[
            {name:"Health Systems",icon:false,link:"health_systems"},
            {name:"Gallery",icon:false,link:"gallery"},
            {name:"Pricing",icon:false,link:"pricing"},
            {name:"Log In",icon:false,link:"login"},
            {name:"Sign Up",icon:false,link:"sign_up"}
        ]
    },
    organization_page:{
        init:function ( pd , index , config_obj ) {
            var data_obj = config_obj.data[ index ];
            this.name = data_obj.name;
            this.link = data_obj.link;
            this.icon = data_obj.icon;
        },
        data:[
            {name:"Profile",icon:"ion-ios-browsers",link:"profile"},
            {name:"Connections",icon:"ion-arrow-expand",link:"connections"},
            /*{name:"Messages",icon:"ion-clipboard",link:"messages"},
            {name:"Transmissions",icon:"ion-arrow-expand",link:"transmissions"},
            {name:"Errors",icon:"ion-alert-circled",link:"errors"},*/
            {name:"Logs",icon:"ion-clipboard",link:"logs"},
            {name:"Users",icon:"ion-ios-browsers",link:"users"}
        ]
    },
    cats:{
        init:function ( pd ) {
            this.name = pd.db_random( "firstName" );
            this.favorite_toy = pd.db_random( "noun" );
        }
    }
}
