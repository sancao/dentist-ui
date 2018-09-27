
<template>
    <div>
        <div class="form-group">
            <router-link to="/" class="btn btn-warning">
            <span class="glyphicon glyphicon-arrow-left"></span> Quay lại</router-link>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading"><span class="glyphicon glyphicon-plus"></span> 
                Tạo mới user</div>
            <div class="panel-body">
                <form @submit.prevent="saveForm()">
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Tên</label>
                            <input type="text" placeholder="Tên công ty" class="form-control"
                                v-model="user.name"
                                v-on:input="$v.user.name.$touch"
                                v-bind:class="{error: $v.user.name.$error, 
                                valid: $v.user.name.$dirty && !$v.user.name.$invalid}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Địa chỉ</label>
                            <input type="text" placeholder="nhập địa chỉ của user" class="form-control"
                                v-model="user.address"
                                v-on:input="$v.user.address.$touch"
                                v-bind:class="{error: $v.user.address.$error,
                                 valid: $v.user.address.$dirty && !$v.user.address.$invalid}">
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Điện thoại</label>
                            <input type="text" 
                            placeholder="Nhập website của công ty ví dụ:http://congtyabc.vn" 
                            class="form-control"
                                v-model="user.phone"
                                v-on:input="$v.user.phone.$touch"
                                v-bind:class="{error: $v.user.phone.$error, 
                                valid: $v.user.phone.$dirty 
                                && !$v.user.phone.$invalid}">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Email</label>
                            <input type="text" 
                            placeholder="Nhập email của công ty ví dụ:congty_abc@gamil.com" 
                            class="form-control"
                                v-model="user.email"
                                v-on:input="$v.user.email.$touch"
                                v-bind:class="{error: $v.user.email.$error,
                                 valid: $v.user.email.$dirty 
                                 && !$v.user.email.$invalid}">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <button class="btn btn-success" :disabled="$v.user.$error">
                                <span class="glyphicon glyphicon-save"></span> Lưu</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
    import { required, minLength,maxLength,email,url } from 'vuelidate/lib/validators';

    export default {
        data: function () {
            return{
                user: {
                    name: '',
                    address: '',
                    phone: '',
                    email:'',
                }
            }
        },
        validations: {
            company: {
                name: {
                    required,
                    minLength: minLength(5),
                    maxLength:maxLength(200)
                },
                address: {
                    required,
                    minLength: minLength(5),
                    maxLength:maxLength(200)
                },
                phone: {
                    required,
                    minLength: minLength(5),
                    maxLength:maxLength(200),
                    url
                },
                email: {
                    required,
                    email,
                    minLength: minLength(5),
                    maxLength:maxLength(50)
                }
            }
        },
        methods: {
            saveForm() {
                this.$v.user.$touch();
                if (!this.$v.$invalid) {
                    var vm = this;
                    var newUser = app.user;
                    axios.post('/api/v1/users', newUser)
                    .then(function (resp) {
                        vm.$router.push({path: '/'});
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Could not create your company");
                    });    
                }
            }
        }
    }
</script>
