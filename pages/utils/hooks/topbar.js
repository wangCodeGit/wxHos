import { ref } from "vue";
export default function setNavSize(){
	const navHeight = ref(0)
	const {system, statusBarHeight} = uni.getSystemInfoSync();
	const isIos = system.indexOf("ios") > -1
	if(!isIos) {
		navHeight.value = 96
	}else {
		navHeight.value = 88
	}
	return {navHeight}
}