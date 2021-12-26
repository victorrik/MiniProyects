import * as React from 'react';
import { StackActions,TabActions,DrawerActions } from '@react-navigation/native';

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();
export const childrenRef = React.createRef();

export function navigate(name, params) {
	navigationRef.current.navigate(name, params);
	/*
	if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
  	console.log("todavia ño >:v")
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }*/
}
export function push(name, params){
	navigationRef.current?.dispatch(StackActions.push(name, params));
	/*
	if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted

    navigationRef.current?.dispatch(StackActions.push(name, params));
  } else {
  	console.log("todavia ño >:v")
  	console.log(isReadyRef.current ,navigationRef.current ,childrenRef.current)
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
  */
}
export function openDrawer() {
	navigationRef.current?.dispatch(DrawerActions.openDrawer());
}
export function jumpTo(name, params={}) {
	navigationRef.current?.dispatch(TabActions.jumpTo(name, params));
}
export function pop(){
  navigationRef.current?.dispatch(StackActions.pop());
}
export function setParams(params){
  navigationRef.current?.setParams(params);
}
export function replace(name, params) {
	navigationRef.current?.dispatch(StackActions.replace(name, params));
}
export function goBack() {
	navigationRef.current?.goBack();
}
export const navigation = {
	navigate,
	jumpTo,
	replace,
	push,
	goBack,
  setParams,
  openDrawer
}