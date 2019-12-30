import { SET_VALUE_OF_OBJ, ADD_NUMBER_TO_OBJ_VALUE } from './mutation-types'

export default {
	state: {
		obj: {
			value: 1
		}
	},
	getters: {
		getObj: state => {
			return state.obj
		},
		getIncrementedValue: state => incValue => {
			return state.obj.value + incValue
		}
	},
	mutations: {
		[SET_VALUE_OF_OBJ](state, payload) {
			state.obj.value = payload.value
		},
		[ADD_NUMBER_TO_OBJ_VALUE](state, payload) {
			state.obj.value += payload.value
		}
	},
	actions: {
		setValueOfObj({ commit }, value) {
			commit({ type: SET_VALUE_OF_OBJ, value: value })
		},
		addValueToObjValue({ commit }, addValue) {
			commit({ type: ADD_NUMBER_TO_OBJ_VALUE, value: addValue })
		}
	}
}
