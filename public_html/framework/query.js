/**
 * Created On: 2017-1-17
 * Object: queryBuild
 * insert into taskbars (tname, pid,pos) valueS ('todo',1,0)
 */

var queryBuild = {
  //ConstructorQ_ueryBuild.prototype.db : null;
  db: openDatabase("kscr", "1.0", "WebSql simpler a",
          4 * 1024 * 1024),
  transaction: function (q) {
    this.db.transaction(function (tx) {
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
		tb = ["CREATE TABLE IF NOT EXISTS `userlist` (\
    `id` integer NOT NULL,\
    `name` VARCHAR(30),\
    `surname` VARCHAR(30),\
    `email` VARCHAR(70),\
    `phone` VARCHAR(15) NOT NULL,\
    `unique_id` varchar(20),\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `institution` (\
    `id` integer NOT NULL,\
    `name` varchar(40) NOT NULL,\
    `longitute` float NOT NULL,\
    `latitude` float NOT NULL,\
    `address` varchar(100) NOT NULL,\
    `province` varchar(2) NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `access_log` (\
    `id` integer NOT NULL,\
    `client_id` interger NOT NULL,\
    `platform` integer NOT NULL,\
    `when` datetime NOT NULL,\
    `med_prof_id` integer NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `platforms` (\
    `id` integer NOT NULL,\
    `name` varchar(50) NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `activity_log` (\
    `id` integer NOT NULL,\
    `data` varchar(200) NOT NULL,\
    `when` datetime NOT NULL,\
    `userlist_id` integer NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `user_details` (\
    `date_of_birth` date,\
    `id_number` integer,\
    `occupation` varchar(15),\
    `address` varchar(80),\
    `work` varchar(15),\
    `ulist_id` integer NOT NULL,\
    `id` integer NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `user_med_history` (\
    `institute` integer NOT NULL,\
    `id` integer NOT NULL,\
    `date_of_visit` date NOT NULL,\
    `description` varchar(200),\
    `title` varchar(25) NOT NULL,\
    `med_professional_sign` integer,\
    `ulist_id` integer NOT NULL,\
    `diagnosis` varchar(300) NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `user_signatures` (\
    `id` integer NOT NULL,\
    `ulist_id` integer,\
    `key_file` varchar(100),\
    `nat_id_number` varchar(15) NOT NULL,\
    `nationality_key` varchar(4) NOT NULL,\
    `user_passcode` varchar(100) NOT NULL,\
    `salt_version` integer NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `medical_professional_list` (\
    `id` integer NOT NULL,\
    `licence_number` varchar(30) NOT NULL,\
    `specialisation_key` varchar(3) NOT NULL,\
    `reg_id` integer NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `medical_specialisation` (\
    `id` integer NOT NULL,\
    `key` varchar(3) NOT NULL,\
    `title` varchar(10) NOT NULL,\
    `description` varchar(150) NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `medical_signatures` (\
    `id` integer NOT NULL,\
    `ulist_id` integer NOT NULL,\
    `key_file` integer NOT NULL,\
    `expiration` date NOT NULL,\
    `validation` date NOT NULL,\
    `nationality_key` varchar(4) NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `relations` (\
    `id` integer NOT NULL,\
    `user_1` integer NOT NULL,\
    `user_2` integer NOT NULL,\
    `relation_description` varchar(100),\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `user_treatment` (\
    `id` integer NOT NULL,\
    `ulist_id` integer NOT NULL,\
    `umhistory_id` integer NOT NULL,\
    `med_description` varchar(100) NOT NULL,\
    `frequency` numeric NOT NULL,\
    `begin` datetime NOT NULL,\
    `end` datetime NOT NULL,\
    PRIMARY KEY (`id`)\
);","CREATE TABLE IF NOT EXISTS `bookings` (\
    `id` integer NOT NULL,\
    `booking` date NOT NULL,\
    `confirmed` char NOT NULL,\
    `type_` char NOT NULL,\
    `desc` varchar(100),\
    `location_id` id NOT NULL,\
    PRIMARY KEY (`id`)\
);"];
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
        qs += obj[0];
        for (var a = 1; a < obj.length; a++) {
          qs += ", " + (obj[a]===undefined?null:obj[a]);
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
  }
};





