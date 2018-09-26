
<template>
    <div>
        <div class="form-group">
            <router-link to="/edit-benh-nhan" class="btn btn-warning">
            <span class="glyphicon glyphicon-arrow-left"></span> Quay lại</router-link>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">Cập nhật</div>
            <div class="panel-body">
                <form v-on:submit="saveForm()">
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Tên khách hàng</label>
                            <input type="text" placeholder="Tên khách hàng" class="form-control"
                                v-model="benhnhan.name"
                                v-on:input="$v.benhnhan.name.$touch"
                                v-bind:class="{error: $v.benhnhan.name.$error, 
                                valid: $v.benhnhan.name.$dirty && !$v.benhnhan.name.$invalid}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Địa chỉ</label>
                            <input type="text" placeholder="nhập địa chỉ của khách hàng" 
                            class="form-control"
                                v-model="benhnhan.address"
                                v-on:input="$v.benhnhan.address.$touch"
                                v-bind:class="{error: $v.benhnhan.address.$error,
                                 valid: $v.benhnhan.address.$dirty && !$v.benhnhan.address.$invalid}">
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Website</label>
                            <input type="text" 
                            placeholder="Nhập website của công ty ví dụ:http://congtyabc.vn" 
                            class="form-control"
                                v-model="benhnhan.website"
                                v-on:input="$v.benhnhan.website.$touch"
                                v-bind:class="{error: $v.benhnhan.website.$error, 
                                valid: $v.benhnhan.website.$dirty 
                                && !$v.benhnhan.website.$invalid}">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 form-group">
                            <label class="control-label">Email</label>
                            <input type="text" 
                            placeholder="Nhập email của công ty ví dụ:congty_abc@gamil.com" 
                            class="form-control"
                                v-model="benhnhan.email"
                                v-on:input="$v.benhnhan.email.$touch"
                                v-bind:class="{error: $v.benhnhan.email.$error,
                                 valid: $v.benhnhan.email.$dirty 
                                 && !$v.benhnhan.email.$invalid}">
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
            app.benhnhanId = id;
            axios.get('/benhnhan/' + id)
                .then(function (resp) {
                    app.benhnhan = resp.data;
                })
                .catch(function () {
                    alert("Could not load your company")
                });
        },
        data: function () {
            return {
                benhnhanId: null,
                benhnhan: {
                    name: '',
                    address: '',
                    website: '',
                    email: '',
                }
            }
        },
        validations: {
            benhnhan: {
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
                this.$v.benhnhan.$touch();
                var app = this;
                var newBenhnhan = app.benhnhan;
                axios.patch('/benhnhan/' + app.benhnhanId, newBenhnhan)
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
