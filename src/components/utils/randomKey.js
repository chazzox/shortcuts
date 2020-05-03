// creating a random key for a new link
export default function makeKey() {
	var key = '';
	// what letters are we allowed to use
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < 4; i++) {
		// adding a random char to the key
		key += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return key;
}
