/**
 * =>>USAGE
 * @function setdata = place data in database
 *  @param path => /path/to/data
 *  @param key => unique data key
 *  @param value => value of key(can be JSON Object)
 * @function getdata = get data in database 
 *  @param callBack => function execute on completion on async opp
 * @function callBackList = data in database 
 *  @param s => snapshot
 *  @return fbOp.res => JSON || array of results
 * 
 * @example 
 * fbOp.init();     //run once
 * fbOp.getData(/path/to/users,fbOp.callBackList);  
 * // results example fbOp.res => [{name:"user1",data:{first:"Bafana",last:"Zulu",dob:"2017-03-07"}},
 *                                {name:"user2",data:{first:"Basetsana",last:"Zulu",dob:"2012-05-08"}}]
*/

var fbOp;
fbOp = {
    res: null,
    init: function () {
        // Initialize Firebase
        // enable Anon Authentication and email auth
        var config = {
            apiKey: "AIzaSyBhTwbxRw2jpjFHA3YwnVq3U3Vh5kscwwY",
            authDomain: "kasicare.firebaseapp.com",
            databaseURL: "https://kasicare.firebaseio.com",
            projectId: "kasicare",
            storageBucket: "",
            messagingSenderId: "232449630041"
        };
        firebase.initializeApp(config);
    },
    setData: function (path, key, value) {
        var dbRec = firebase.database().ref(path);
        dbRec.child(key).set(value);
    },
    getData: function (path, callBack) {
        var getdb = firebase.database().ref(path);
        getdb.once('value').then(callBack);
    },
    callBackList: function (s) {
        fbOp.res = [];
        var cnt = 0;
        s.forEach(function (child) {
            var tmp = [];
            tmp['name'] = child.key;
            tmp['data'] = child.val();
            fbOp.res.push(tmp);
        });
    },
    callBackSingle: function (s) {
        fbOp.res = s.val();
    }
};