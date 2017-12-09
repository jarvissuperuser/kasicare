/*** 
 * @requires jQuery
 */

var dataHolding = window.dataHolding || {};
var queryBuild = window.queryBuild || {};
var fbOp = window.fbOp || {};
var UIMan = {
	d:{},
	/**
	 * @param {Event} e 
	 */
	submit_rec:function(e){
		e.preventDefault();
		var form = $(e.target).find('input:valid');
		var data = [];
		if (form.hasOwnProperty('length'))
			for (var i = 0; i < 3;i++){
				 data[form[i].name] = "'"+$(form[i]).val()+"'";
			}
		if (data.hasOwnProperty('inci')){
			queryBuild.transaction(queryBuild.insert(dataHolding.q_med[0],
			"title,institute,date_of_visit,ulist_id,diagnosis",
			[data['inci'],"0",data['i_date'],dataHolding.active_profile.id,"''"]
			));
		}
//	queryBuild.insert('userli');
		//console.log(data);		
	},
	submit_dum_ulist:function (){
		 var d = {userlist:[], user_signatures:[],user_details:[]};
		 d.userlist.name= "'Bafana'";
		 d.userlist.surname= "'Zulu'";
		 d.userlist.email= "'bfzulu@example.org'";
		 d.userlist.phone= "'27815162835'";
		 d.userlist.unique_id= "'AzNnkdfjkjklkjLjlj'";
		 d.user_details.date_of_birth  = "'01-07-2010'";
		 d.user_details.id_number = "'1'";
		 d.user_details.occupation = "'Dentist'";
		 d.user_details.address = "'No One Eloff'";
		 d.user_details.ulist_id = "'1'";
		 d.user_signatures.ulist_id  = "'1'";
		 d.user_signatures.key_file = "'/path/to/file'";
		 d.user_signatures.nat_id_number = "'9001236753081'";
		 d.user_signatures.nationality_key = "'za'";
		 d.user_signatures.user_passcode = "'dGVzdDEyMwo='";
		 d.user_signatures.salt_version = "'0'";
		 var k = [],ite="done",dt = [],t;
		 for(var i in d.user_signatures){
			 k.push(i);
			 dt.push(d.user_signatures[i]);
		 }
		console.log(dt,k);
		localStorage.setItem('usrdt',JSON.stringify(d));
		 //queryBuild.transaction(queryBuild.insert('user_signatures',k,dt));		 
		 return ite;
		 
		 //
	},
	user_init:function (){
		queryBuild.exec('select * from userlist limit 1',function(tx,rx){
			dataHolding.active_profile = rx.rows.item(0);
		});
		queryBuild.exec('select count(*) as c from userlist',function(tx,rx){
			dataHolding.profile_count = rx.rows.item(0).c;
		});
	},
	add_user:function(e,type){
		e.preventDefault();
		dataHolding.active_profile = {};
		var form = $(e.target).find('input:valid');
		var data = [];
		var k = [];
		var query ="";
		if (form.hasOwnProperty('length'))
			for (var i = 0; i < form.length;i++){
				if ($(form[i]).val() !== "" && form[i].name !== undefined){
					if (form[i].name === 'gender')
						data.push("'"+$($("input:checked")).val()+"'");
					else
						data.push("'"+$(form[i]).val()+"'");
					k.push(form[i].name);
				}
			}
		switch (type) {
			case 1:
				query = queryBuild.insert(dataHolding.q_user[0],k,data);
				queryBuild.exec(query,function (tx,rx){
					$('.ua_2 input.ui-hidden-accessible').val(rx.insertID);
					$('.ua_3 input.ui-hidden-accessible').val(rx.insertID);
					$('.ua_4 input.ui-hidden-accessible').val(rx.insertID);
				});
				break;
			case 2:
			case 3:
			case 4:
				query = queryBuild.insert(dataHolding.q_user[type-1],k,data);
				break;
			default:
				return 'error';
				break;
		}
		//queryBuild.transaction(query);
		
	},
	update_user:null,
	register_user:null,
	start_up:function (){
		this.user_init();
		fbOp.init();
	}
};