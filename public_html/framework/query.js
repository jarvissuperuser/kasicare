/**
 * Created On: 2017-1-17
 * Object: queryBuild
 * 
 */
var dataHolding = dataHolding||{dbinit:null};//prototype
var queryBuild = {
  //ConstructorQ_ueryBuild.prototype.db : null;
  db: openDatabase("kscr", "1.0", "WebSql simpler a",
          4 * 1024 * 1024),
  transaction: function (q) {
    queryBuild.db.transaction(function (tx) {
      tx.executeSql(q);
      //console.log(q);
    }, function (er) {
      console.log(er, q);
    });
  }, /**
   * @param selection {}
   * @param table {}
   * @param lim {}
   * @return qs{} query string
   */
  slct: function (selection, table, lim) {
    //TODO: Implement Me
    var qs = "SELECT ";
    qs += this.arrayJustify(selection);
    qs += " FROM ";
    qs += this.arrayJustify(table);
    if (lim !== undefined) {
      qs += " WHERE ";
      qs += lim;
    }
    return qs;

  },
  /**
   * @param table {} UPDATE 'table
   * @param colepar {} SET 'col = 'par
   * @param id {} where 'id
   * @param val {}  = 'val
   * @return qs
   */
  update: function (table, colepar, id, val) {
    //TODO: Implement Me
    var qs = "UPDATE " + table + ' SET ';
    qs += this.arrayJustify(colepar);
    qs += " WHERE " + id + " = " + val;
    return qs;
  },
  /**
   * @return qs{null}
   */
  init: function () {
    //TODO: 
    console.log("dbinit");
    var tb =[];
		tb = dataHolding.dbinit;
		var max;
		tb.forEach(function (item, index){
			queryBuild.transaction(item);
			max = index;
		});
    return max;
  },
  /**
   * @param {object} obj description
   * @return qs{null}
   */
  arrayJustify: function (obj) {
    //TODO: Implement Me
    var qs = '';
    if (obj!==undefined) {
      if(!obj.hasOwnProperty("substr"))
        qs += obj;
    } else /*if (obj.hasOwnProperty("length")) */ {
      if ((obj[0]) !== undefined && obj.hasOwnProperty("length")){
        qs += "'" + obj[0]+"'";
        for (var a = 1; a < obj.length; a++) {
          qs += ", '" + (obj[a]===undefined?null:obj[a]) +"'";
        }
      }
    }
    return qs;
  },
  /**
   * @param tble {}
   * @param cols {}
   * @param vals {}
   * @return qs{null}
   */
  insert: function (tble, cols, vals) {
    //TODO: Implement Me --dangerous
    //console.log('datas',cols,vals);
    var qs = "INSERT or REPLACE INTO ";
    qs += tble + "(";
    qs += this.arrayJustify(cols);
    qs += ") VALUES (";
    qs += this.arrayJustify(vals) + ")";
    return qs;
  },
  /**
   * @param {string} query
	 * @param {function} callback
   */
	exec:function (query, callback){
		queryBuild.db.transaction(function (tx) {
      tx.executeSql(query,[],callback);
    }, function (er) {
      console.log(er, query);
    });
	}
};