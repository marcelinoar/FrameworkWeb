//
// Funciones globales.
//
var ModelEncoder = {
	ParsearId: function  (id_str) {
		id_obj = "[{" + id_str + "}]";
		return eval (id_obj)[0];
	},

	EncodeArr: function (arr) {
		var ret = '';
		var cnt = arr.length;

		for (var i = 0; i < arr.length; i++) {
			ret += arr[i];

			if (cnt-- > 1) {
				ret += ','
			}
		}

		return ret;
	}
}

