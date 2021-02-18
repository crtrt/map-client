<template style="overflow-y: hidden">
    <div class="loginWrapper">
        <div class="back-ground" style="overflow-y: hidden; z-index: -1">
            <img src="../assets/image/index-background.jpg">
        </div>

        <el-tabs class="bd" type="border-card">

            <el-tab-pane label="管理员登录">
                <p class="title">
                    多维线路展示系统
                    <span style="display: inline-block; padding-left: 100%"></span>
                </p>
                <el-form :model="loginForm" :rules="loginRule" ref="loginForm" :label-position="labelPosition">


                    <el-form-item  prop="userName" class="login-item" style="margin: 0">
                        <el-input type="userName" v-model="loginForm.userName" placeholder="账号" @keyup.enter.native="submitForm('loginForm')"></el-input>
                    </el-form-item>
                    <el-form-item prop="pwd" style="margin-top: 20px;margin-bottom: 0px">
                        <el-input v-model="loginForm.pwd" placeholder="密码" type="password" @keyup.enter.native="submitForm('loginForm')"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top: 20px">
                        <el-button type="primary" @click="submitForm(loginForm)" class="submitBtn" round >登录</el-button>

<!--                        <el-button type="primary" @click="test()" class="submitBtn" round >测试</el-button>-->
                    </el-form-item>
                </el-form>
                <el-button type="text" style="display:block;margin:0 auto;margin-top: -10px" @click="dialogRegister=true">注册</el-button>
            </el-tab-pane>
        </el-tabs>


        <el-dialog
                v-if="isInit"
                title="注册"
                :visible.sync="dialogRegister">
            <el-form :model="registerForm" :rules="registerRule" ref="registerForm" label-width="80px" >
                <el-form-item label="用户名" prop="name" class="login-item">
                    <el-input v-model="registerForm.name"  placeholder="请输入用户名" @keyup.enter.native="registerform('registerForm')"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" >
                    <el-input v-model="registerForm.password" placeholder="请输入您的账号密码" type="password" @keyup.enter.native="registerform('registerForm')"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="passwordConfirm" >
                    <el-input v-model="registerForm.passwordConfirm" placeholder="请再次输入密码确认" type="password" @keyup.enter.native="registerform('registerForm')"></el-input>
                </el-form-item>
<!--                <el-form-item label="头像">-->
<!--                    <el-upload ref="upfile"-->
<!--                               action="#"-->
<!--                               :auto-upload="false"-->
<!--                               :on-change="handleChange"-->
<!--                               :show-file-list="false"-->
<!--                               :limit="1"-->
<!--                               accept="image/png,image/gif,image/jpg,image/jpeg"-->
<!--                    >-->
<!--                        <img v-if="imgUrl" :src="imgUrl" width="80" height="80"/>-->
<!--                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--                    </el-upload>-->

<!--                </el-form-item>-->

                <el-form-item label="真实姓名" prop="realname" class="login-item" >
                    <el-input v-model="registerForm.realname" placeholder="请输入您的真实姓名" @keyup.enter.native="registerform('registerForm')"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" >
                    <el-input v-model="registerForm.email" placeholder="请输入您的邮箱"  @keyup.enter.native="registerform('registerForm')"></el-input>
                </el-form-item>
                <el-form-item label="固定电话" prop="phone" >
                    <el-input v-model="registerForm.phone" placeholder="请输入您的固定电话"  @keyup.enter.native="registerform('registerForm')"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="mobile" >
                    <el-input v-model="registerForm.mobile" placeholder="请输入您的联系电话"  @keyup.enter.native="registerform('registerForm')"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogRegister = false">取 消</el-button>
                <el-button type="primary" @click="register(registerForm)">注 册</el-button>
             </span>
        </el-dialog>



    </div>
</template>

<script>

    import { loginIn,SignUp } from '../api/index'

    export default {
        components: {

        },

        data () {
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                isInit: false,
                loadingLogin: false,
                labelPosition: 'left',
                loginForm: {
                    userName: '',
                    pwd: ''
                },
                loginRule: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                        //{ min: 3, max: 10, message: '长度在 3 到 16 个字符', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                        //{ min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ]
                },

                // imgUrl:'',
                dialogRegister: false,
                registerForm:{
                    name: '',
                    password: '',
                    passwordConfirm: '',
                    realname: '',
                    sex: '',
                    email: '',
                    phone: '',
                    mobile:'',
                },
                registerRule: {
                    name: [
                        { required: true,  message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                        // { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    passwordConfirm:[{
                        required: true, message: '请确认密码', trigger: 'blur'
                    },
                        { validator: validatePass2, trigger: 'blur' }],
                    realname:[{
                        required: true, message: '请输入真实姓名', trigger: 'blur'
                    }],
                    sex:[{
                        required: true, message: '请输入性别', trigger: 'blur'
                    }],
                    email:[{
                        required: true, message: '请输入邮箱', trigger: 'blur'
                    }],
                    phone:[{
                        required: true, message: '请输入固定电话', trigger: 'blur'
                    }],
                    mobile:[{
                        required: true, message: '请输入联系电话', trigger: 'blur'
                    }],
                },
                isShow : false,
            }
        },

        mounted() {
            // 先登录
            this.isInit = true;

        },

        methods: {
            // handleChange(file,fileList){
            //     this.fileList = fileList;
            //     console.log(file)
            //     //生成本地图片的url，直接src显示,删除或移动后url就失效了
            //     this.imgUrl = URL.createObjectURL(file.raw);
            //
            //
            // },

            test(){
                this.$router.push({path: '/Home'});
            },
            submitForm (loginForm) {
                console.log("loginForm")
                console.log(loginForm.userName)
                console.log(loginForm.pwd)

                let _this = this
                let params = new URLSearchParams()
                params.append('name', loginForm.userName)
                params.append('password', loginForm.pwd)

                loginIn(params)
                    .then(res => {
                        console.log("res")
                        console.log(res)

                        if (res.code === 1) {
                            _this.$message({
                                message: '登录成功',
                                type: 'success'
                            })
                            _this.setUserMsg(res.id,loginForm.userName)


                            setTimeout(function () {
                                _this.$router.push({path: '/Home'})
                            }, 2000)
                        } else {
                            _this.$message.error('用户名或密码错误')
                        }
                    }).catch(msg => {
                    console.log("msg")
                    console.log(msg)
                       alert(msg)
                });

            },
            setUserMsg (id,name) {
                this.$store.commit('setUserId', id)
                this.$store.commit('setUsername',name )
                // this.$store.commit('setAvator',avator )
            },


            register(registerForm){
                // var face = this.fileList[0];
                // console.log("face");
                // console.log(face);
                // console.log("this.imgUrl");
                // console.log(this.imgUrl);
                 let _this = this
                 let params = new URLSearchParams()
                 params.append('name', registerForm.name)
                 params.append('password', registerForm.password)
                 params.append('realname', registerForm.realname)
                 params.append('sex', registerForm.sex)
                 params.append('email', registerForm.email)
                 params.append('phone', registerForm.phone)
                 params.append('mobile', registerForm.mobile)

                 // params.append('avator', '/img/user.jpg')
                 SignUp(params)
                   .then(res => {
                     console.log(res)
                     if (res.code === 1) {
                         _this.$message.success('注册成功')
                         _this.dialogRegister=false
                     } else {
                         _this.$message.error('注册失败')
                     }
                   })
                   .catch(err => {
                     console.log(err)
                   })

            },


        }
    }
</script>

<style scoped>
    .back-ground{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .back-ground>img{
        width: 100%;
        height: 100%;
    }

    .bd{
        width: 20rem;
        margin-left: 15%;
        margin-top: 15%;
        min-height: 15rem;
        background-color: white;
        border-radius: 5px;
    }

    .title{
        width:100%;
        text-align: justify;
        height: 2.5rem;
        font-weight:bold;
        font-size: 22px;
    }
    .title:after{
        display: inline-block;
        width: 100%;
        content: '';
    }

    .submitBtn{
        width: 100%;
        border-radius: 0;
        margin-bottom: 0px;
        background-color: #1965d9;
        border-width: 0;
        transition: 1s;
    }


</style>

