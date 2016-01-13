


module.exports = {
    app:{
        init:function ( pd ) {
            // this.name = pd.db_random( "firstName" );
            // this.favorite_toy = pd.db_random( "noun" );

            /*this.cats = 	pd.generateArray(
                                    "cats" ,  pd.random( 7 , 13 ),
                                    this , "dog"
                                );*/

            this.main_pages = pd.generateArray(
                                    "main_page" ,
                                    pd.config.main_page.data.length
                                );

            this.orig_main_pages =  pd.generateArray(
                                        "orig_main_page" ,
                                        pd.config.orig_main_page.data.length
                                    );

            this.organization_pages
                = pd.generateArray( "organization_page" , 6 );

            this.data_models =  pd.generateArray(
                                    "data_model" ,
                                    pd.config.data_model.data.length
                                );


            this.organizations = pd.generateArray(
                                    "organization" , 10,
                                    this, "app"

                                );
            this.focused_organization = this.organizations[2];



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
            /*{name:"Organization Name",icon:"ion-ios-browsers",link:"organization"},
            {name:"Documentation",icon:"ion-clipboard",link:"docs"},
            {name:"user@username.com",icon:false,link:"user_profile"}*/

            {name:"Organization",icon:false,link:"organization",secondary_page:"profile"},
            {name:"Gallery",icon:false,link:"gallery",secondary_page:""},
            {name:"Documentation",icon:false,link:"docs",secondary_page:""},
            {name:"Log In",icon:false,link:"login",secondary_page:""},
            {name:"Sign Up",icon:false,link:"sign_up",secondary_page:""}
        ]
    },
    orig_main_page:{
        init:function ( pd , index , config_obj ) {
            var data_obj = config_obj.data[ index ];
            this.name = data_obj.name;
            this.link = data_obj.link;
            this.icon = data_obj.icon;
            this.secondary_page = data_obj.secondary_page;
        },

        data:[
            {name:"Health Systems",icon:false,link:"health_systems",secondary_page:"profile"},
            {name:"Gallery",icon:false,link:"gallery",secondary_page:""},
            {name:"Pricing",icon:false,link:"pricing",secondary_page:""},
            {name:"Dashboard",icon:false,link:"organization",secondary_page:"profile"},
            {name:"Log In",icon:false,link:"login",secondary_page:""},
            {name:"Sign Up",icon:false,link:"sign_up",secondary_page:""}
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
            {name:"Dev-Tools",icon:"ion-code",link:"dev_tools"},
            {name:"Users",icon:"ion-ios-browsers",link:"users"},
            {name:"TEST",icon:"ion-ios-browsers",link:"test"}
        ]
    },
    organization:{
        init:function ( pd ) {
            this.name = pd.db_random( "firstName" ) + " Health Care";

            this.outbound_connections = [];
            this.inbound_connections = [];
            this.connections = pd.generateArray(
                            "connection" ,
                            pd.random( 6 , 10 ),
                            this, "organization"
                        );

            this.logs = pd.generateArray(
                            "log" ,
                            pd.random( 20, 50 ),
                            this, "organization"
                        );

            this.profile_public = pd.random( 0 , 1 );
        }
    },
    log:{
        init:function ( pd ) {
            this.title = pd.db_random( "noun" ) + " Log Message";

            // link to organization is made by now...
            this.connection = pd.randomFromArray(
                                this.organization.connections
                            );

            this.connection.logs.push( this );

            this.success = ( Math.random() > .8 ) ? false : true;

            //...data model and server...
            this.data_model = pd.randomFromArray(
                                this.organization.app.data_models
                            );
        }
    },
    data_model:{
        init:function ( pd , index , config_obj ) {
            var data_obj = config_obj.data[ index ];
            this.name = data_obj.name;
            this.icon = data_obj.icon;
        },
        data:[
            {name:"Clinical Survey",icon:"fa-plus-circle"},
            {name:"Device",icon:"fa-heartbeat"},
            {name:"Financial",icon:"fa-money"},
            {name:"Flowsheet",icon:"fa-bar-chart"},
            {name:"Media",icon:"fa-paperclip"},
            {name:"Orders",icon:"fa-list-alt"},
            {name:"Patient Admin",icon:"fa-street-view"},
            {name:"Patient Search",icon:"fa-search-plus"},
            {name:"Results",icon:"fa-flask"},
            {name:"Scheduling",icon:"fa-calendar"},
            {name:"Vaccine",icon:"fa-eyedropper"},
        ]
    },
    connection:{
        init:function ( pd ) {
            this.title = pd.db_random( "noun" ) + " " + pd.db_random( "noun" ) + " Connection";

            if ( Math.random() > .6 ) {
                this.type = "outbound";
                this.organization.outbound_connections.push( this );
            }else if ( Math.random() > .3 ){
                this.type = "inbound";
                this.organization.inbound_connections.push( this );

                if ( Math.random() > .6 ) {
                    this.end_point = "";
                    this.verified = false;
                }else{
                    this.end_point = "http://www.myorganization.com/api/endpoint";
                    this.verified = true;
                }
            }else{
                this.type = "query";
            }

            this.logs = [];// populated via logs...

        }
    }
}
