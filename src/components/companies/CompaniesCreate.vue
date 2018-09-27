
<template>
    <div>
        <div class="form-group">
            <router-link :to="{name: 'companies'}"
             class="btn btn-warning">
            <span class="glyphicon glyphicon-arrow-left"></span> Quay lại
            </router-link>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading"><span class="glyphicon glyphicon-plus"></span> 
                Tạo mới công ty</div>
            <div class="panel-body">
                <form @submit.prevent="saveForm()">
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <div class="input-group">
                                <span class="input-group-addon">Text <i class="glyphicon glyphicon-text-background"></i></span>
                                <input type="text" placeholder="Nhập tên công ty" class="form-control"
                                v-model="company.name"
                                v-on:input="$v.company.name.$touch"
                                v-bind:class="{error: $v.company.name.$error, 
                                valid: $v.company.name.$dirty && !$v.company.name.$invalid}">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <div class="input-group">
                                <span class="input-group-addon">Text 
                                    <i class="glyphicon glyphicon-text-background"></i></span>
                                <input type="text" placeholder="Nhập địa chỉ của công ty" class="form-control"
                                    v-model="company.address"
                                    v-on:input="$v.company.address.$touch"
                                    v-bind:class="{error: $v.company.address.$error,
                                    valid: $v.company.address.$dirty && !$v.company.address.$invalid}">
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <div class="input-group">
                                <span class="input-group-addon"> Text 
                                    <i class="glyphicon glyphicon-text-background"></i></span>
                                <input type="text" 
                                placeholder="Nhập website của công ty ví dụ:http://congtyabc.vn" 
                                class="form-control"
                                    v-model="company.website"
                                    v-on:input="$v.company.website.$touch"
                                    v-bind:class="{error: $v.company.website.$error, 
                                    valid: $v.company.website.$dirty 
                                    && !$v.company.website.$invalid}">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-user"></i></span>
                                <input type="text" 
                                placeholder="Nhập email của công ty ví dụ:congty_abc@gamil.com" 
                                class="form-control"
                                    v-model="company.email"
                                    v-on:input="$v.company.email.$touch"
                                    v-bind:class="{error: $v.company.email.$error,
                                    valid: $v.company.email.$dirty 
                                    && !$v.company.email.$invalid}">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <button class="btn btn-success" :disabled="$v.company.$error">
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
                company: {
                    name: '',
                    address: '',
                    website: '',
                    email:''
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
                website: {
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
                this.$v.company.$touch();
                if (!this.$v.$invalid) {
                    var app = this;
                    var newCompany = app.company;
                    axios.post('/api/v1/companies', newCompany)
                    .then(function (resp) {
                        app.$router.push({path: '/'});
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
