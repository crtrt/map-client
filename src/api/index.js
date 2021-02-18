/* eslint-disable*/
import axios from 'axios'
import { get, post,Ppost } from './http'

// =======================> 管理员 API
// 登录
// export const loginIn = (params) => post(`login`, params)
export const loginIn = (params) => Ppost(`/login`, params)
// 注册
export const SignUp = (params) => post(`/register`, params)
//管理员列表
export const getAdminList = () => get('/sysuser')
//管理员信息
export const getAdminInfo = (params) => post(`/sysuser/detail`, params)
//修改信息
export const updateAdminInfo = (params) => post(`/sysuser/detail/update`, params)


// =======================> 老人 API

//列表
export const getOldList = () => get('oldperson')
//信息详情
export const getOldInfo = (params) => post(`oldperson/detail`, params)
//修改信息
export const updateOldInfo = (params) => post(`/oldperson/detail/update`, params)
//删除
export const deleteOldInfo = (params) => post(`/oldperson/delete`, params)
//添加
export const addOld = (params) => post(`/oldperson/insert`, params)
//数据统计
export const dataCount = (params) => post(`/event/count`, params)

// =======================> 工作人员 API

//列表
export const getEmployeeList = () => get('employee')
//信息详情
export const getEmployeeInfo = (params) => post(`employee/detail`, params)
//修改信息
export const updateEmployeeInfo = (params) => post(`/employee/detail/update`, params)
//删除
export const deleteEmployeeInfo = (params) => post(`/employee/delete`, params)
//添加
export const addEmployee = (params) => post(`/employee/insert`, params)


// =======================> 工作人员 API

//列表
export const getVolunteerList = () => get('volunteer')
//信息详情
export const getVolunteerInfo = (params) => post(`volunteer/detail`, params)
//修改信息
export const updateVolunteerInfo = (params) => post(`/volunteer/detail/update`, params)
//删除
export const deleteVolunteerInfo = (params) => post(`/volunteer/delete`, params)
//添加
export const addVolunteer = (params) => post(`/volunteer/insert`, params)


//数据统计
export const dataInfo = () => get(`/event`)
export const dataimginfo = (params) => post(`/event/imageurl`, params)