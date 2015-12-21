


module.exports = {
    app:{
        init:function ( pd ) {
            // this.name = pd.db_random( "firstName" );
            // this.favorite_toy = pd.db_random( "noun" );

            /*this.cats = 	pd.generateArray(
                                    "cats" ,  pd.random( 7 , 13 ),
                                    this , "dog"
                                );*/


            this.pages = 	[
                "first",
                "second",
                "third"
            ];
        },
        root:true
    },
    cats:{
        init:function ( pd ) {
            this.name = pd.db_random( "firstName" );
            this.favorite_toy = pd.db_random( "noun" );
        }
    }
}
