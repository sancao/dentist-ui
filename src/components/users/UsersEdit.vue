
<template>
    <div>
        <div class="form-group">
            <router-link to="/" class="btn btn-warning">
            <span class="glyphicon glyphicon-arrow-left"></span> Quay lại</router-link>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">Sửa thông tin người dùng</div>
            <div class="panel-body">
                <form v-on:submit="saveForm()">
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Tên</label>
                            <input type="text" placeholder="Tên người dùng" class="form-control"
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
                            <label class="control-label">Phone</label>
                            <input type="text" 
                            placeholder="Nhập điện thoại người dùng..." 
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
                            placeholder="Nhập email của Người dùng..." 
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
                            <button class="btn btn-success">Cập nhật</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { required, minLength,maxLength,email,url } from 'vuelidate/lib/validators';
    export default {
        mounted() {
            let app = this;
            let id = app.$route.params.id;
            app.userId = id;
            axios.get('/api/v1/users/' + id)
                .then(function (resp) {
                    app.user = resp.data;
                })
                .catch(function () {
                    alert("Could not load your company")
                });
        },
        data: function () {
            return {
                userId: null,
                user: {
                    name: '',
                    address: '',
                    phone: '',
                    email: '',
                }
            }
        },
        validations: {
            user: {
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
                var app = this;
                var newUser = app.user;
                axios.patch('/api/v1/users/' + app.userId, newUser)
                    .then(function (resp) {
                        app.$router.replace('/');
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Could not create your company");
                    });
            }
        }
    }
</script>
