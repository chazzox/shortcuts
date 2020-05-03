// i did not write this, functions for compressing the config
// i do not understand any of it, although it is probable that i will comment in efforts to do so

// code taken from https://gist.github.com/revolunet/843889
export default function lzw_encode(s) {
	s = JSON.stringify(s);
	var dict = {};
	var data = (s + '').split('');
	var out = [];
	var currChar;
	var phrase = data[0];
	var code = 256;
	for (var i = 1; i < data.length; i++) {
		currChar = data[i];
		if (dict[phrase + currChar] != null) {
			phrase += currChar;
		} else {
			out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
			dict[phrase + currChar] = code;
			code++;
			phrase = currChar;
		}
	}
	out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
	for (var index = 0; index < out.length; index++) {
		out[index] = String.fromCharCode(out[index]);
	}
	return out.join('');
}

// Decompress an LZW-encoded string
export function lzw_decode(s) {
	var dict = {};
	var data = (s + '').split('');
	var currChar = data[0];
	var oldPhrase = currChar;
	var out = [currChar];
	var code = 256;
	var phrase;
	for (var i = 1; i < data.length; i++) {
		var currCode = data[i].charCodeAt(0);
		if (currCode < 256) {
			phrase = data[i];
		} else {
			phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar;
		}
		out.push(phrase);
		currChar = phrase.charAt(0);
		dict[code] = oldPhrase + currChar;
		code++;
		oldPhrase = phrase;
	}
	return out.join('');
}
