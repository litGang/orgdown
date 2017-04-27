export const LOAD_NOTE = 'LOAD_NOTE';

export function loadNotes(sort) {
	return function (dispatch) {
			dispatch({
				type: LOAD_NOTE,
				data: {
					sort: sort
				}
			});
	}
}
