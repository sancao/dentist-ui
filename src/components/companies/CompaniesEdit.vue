
<template>
    <div>
        <div class="form-group">
            <router-link to="/" class="btn btn-warning">
            <span class="glyphicon glyphicon-arrow-left"></span> Quay lại</router-link>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">Sửa công ty</div>
            <div class="panel-body">
                <form v-on:submit="saveForm()">
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Tên công ty</label>
                            <input type="text" placeholder="Tên công ty" class="form-control"
                                v-model="company.name"
                                v-on:input="$v.company.name.$touch"
                                v-bind:class="{error: $v.company.name.$error, 
                                valid: $v.company.name.$dirty && !$v.company.name.$invalid}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Địa chỉ</label>
                            <input type="text" placeholder="nhập địa chỉ của công ty" class="form-control"
                                v-model="company.address"
                                v-on:input="$v.company.address.$touch"
                                v-bind:class="{error: $v.company.address.$error,
                                 valid: $v.company.address.$dirty && !$v.company.address.$invalid}">
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Website</label>
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

                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Email</label>
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
            app.companyId = id;
            axios.get('/api/v1/companies/' + id)
                .then(function (resp) {
                    app.company = resp.data;
                })
                .catch(function () {
                    alert("Could not load your company")
                });
        },
        data: function () {
            return {
                companyId: null,
                company: {
                    name: '',
                    address: '',
                    website: '',
                    email: '',
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
                var app = this;
                var newCompany = app.company;
                axios.patch('/api/v1/companies/' + app.companyId, newCompany)
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
