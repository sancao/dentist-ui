
<template>
    <div>
        <div class="form-group">
            <router-link :to="{name: 'benh-nhan'}"
             class="btn btn-warning">
            <span class="glyphicon glyphicon-arrow-left"></span> Quay lại
            </router-link>
        </div>

        <div>
            <form @submit.prevent="saveForm()">
                <div class="row">
                    <div class="col-md-6 form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Họ tên</span>
                            <input type="text" placeholder="Nhập họ tên khách hàng" class="form-control"
                            v-model.trim="benhnhan.name"
                            v-on:input="$v.benhnhan.name.$touch"
                            v-bind:class="{'error': $v.benhnhan.name.$error, 
                            'valid': $v.benhnhan.name.$dirty && !$v.benhnhan.name.$invalid}">
                        </div>
                        <div class="error" v-if="!$v.benhnhan.name.required">Nhập tên bệnh nhân!</div>
                        <div class="error" v-if="!$v.benhnhan.name.minLength">
                            Tên ít nhất {{$v.benhnhan.name.$params.minLength.min}} ký tự! </div>
                    </div>
                    <div class="col-md-3 form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Ngày sinh</span>
                            <date-picker name="date"
                            v-model="benhnhan.dob" 
                            v-on:input="$v.benhnhan.dob.$touch"
                            v-bind:class="{'error': $v.benhnhan.dob.$error, 
                            'valid': $v.benhnhan.dob.$dirty && !$v.benhnhan.dob.$invalid}"
                            :config="config"></date-picker>
                        </div>
                    </div>
                    <div class="col-md-3 form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Giới tính</span>
                                <select id="inputState"
                                 class="form-control" v-model="benhnhan.gender"
                                 v-on:input="$v.benhnhan.gender.$touch"
                                v-bind:class="{'error': $v.benhnhan.gender.$error, 
                                'valid': $v.benhnhan.gender.$dirty && !$v.benhnhan.gender.$invalid}">
                                    <option value="" disabled selected>Giới tính...</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Địa chỉ</span>
                            <textarea type="text" placeholder="Nhập địa chỉ khách hàng" class="form-control"
                                v-model="benhnhan.address"
                                v-on:input="$v.benhnhan.address.$touch"
                                v-bind:class="{error: $v.benhnhan.address.$error,
                                valid: $v.benhnhan.address.$dirty && !$v.benhnhan.address.$invalid}">
                            </textarea>
                        </div>
                        <div class="error" v-if="!$v.benhnhan.address.minLength">
                            Địa chỉ ít nhất {{$v.benhnhan.address.$params.minLength.min}} ký tự! </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6 form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Yêu cầu</span>
                            <textarea type="text" 
                            placeholder="Nhập yêu cầu..." 
                            class="form-control"
                                v-model="benhnhan.yeu_cau"></textarea>
                        </div>
                    </div>
                    <div class="col-md-6 form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Chuẩn bệnh</span>
                            <textarea type="text" 
                            placeholder="Nhập bệnh lý...." 
                            class="form-control"
                                v-model="benhnhan.chuan_benh"></textarea>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12 form-group">
                        <input type="checkbox" id="tim_mach" 
                        value="tim_mach" v-model="benhnhan.tien_su_benh">
                        <label for="tim_mach">Tim mạch</label>&nbsp;&nbsp;
                        <input type="checkbox" id="co_thai" 
                        value="co_thai" v-model="benhnhan.tien_su_benh">
                        <label for="co_thai">Có thai</label>&nbsp;&nbsp;
                        <input type="checkbox" id="mau_khong_dong" 
                        value="mau_khong_dong" v-model="benhnhan.tien_su_benh">
                        <label for="mau_khong_dong">Máu không đông</label>&nbsp;&nbsp;
                        <input type="checkbox" id="phan_ung_thuoc" 
                        value="phan_ung_thuoc" v-model="benhnhan.tien_su_benh">
                        <label for="phan_ung_thuoc">Phản ứng thuốc</label>&nbsp;&nbsp;
                        <input type="checkbox" id="tieu_duong" 
                        value="tieu_duong" v-model="benhnhan.tien_su_benh">
                        <label for="tieu_duong">Tiểu đường</label>&nbsp;&nbsp;
                        <input type="checkbox" id="huyet_ap" 
                        value="huyet_ap" v-model="benhnhan.tien_su_benh">
                        <label for="huyet_ap">Huyết áp</label>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Điều trị</span>
                            <textarea type="text" 
                            placeholder="Nhập thông tin điều trị...." 
                            class="form-control"
                                v-model="benhnhan.dieu_tri"></textarea>
                        </div>
                    </div>
                    <div class="col-md-6 form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Ký hiệu răng</span>
                            <textarea type="text" 
                            placeholder="Nhập ký hiệu răng...." 
                            class="form-control"
                                v-model="benhnhan.ky_hieu_rang"></textarea>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-3 form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Ngày hẹn</span>
                            <date-picker name="date" v-model="benhnhan.birthday" 
                            :config="config"></date-picker>
                        </div>
                    </div>

                    <div class="col-md-4 form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Điện thoại</span>
                            <input type="text" placeholder="Nhập số điện thoại..." class="form-control"
                            v-model="benhnhan.phone"
                            v-on:input="$v.benhnhan.phone.$touch"
                            v-bind:class="{error: $v.benhnhan.phone.$error,
                            valid: $v.benhnhan.phone.$dirty && !$v.benhnhan.phone.$invalid}">
                        </div>
                        <div class="error" v-if="!$v.benhnhan.phone.minLength">
                            Điện thoại ít nhất {{$v.benhnhan.phone.$params.minLength.min}} số! </div>
                    </div>
                    <div class="col-md-5 form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Email</span>
                                <input type="text" placeholder="Nhập email (nếu có)..." class="form-control"
                            v-model="benhnhan.email">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-10 form-group">
                        <div class="input-group">
                            <span class="input-group-addon">Tổng tiền</span>
                                <input type="text" placeholder="Nhập tổng tiền..." class="form-control"
                            v-model="benhnhan.tong_tien">
                        </div>
                    </div>
                    <div class="col-md-2 form-group">
                        <button type="submit" class="btn btn-success" :disabled="$v.benhnhan.$error">
                            <span class="glyphicon glyphicon-save"></span> Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    // Import this component
    import datePicker from 'vue-bootstrap-datetimepicker';
  
    // Import date picker css
    import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';
    import { required, minLength,maxLength,email,url,numeric } from 'vuelidate/lib/validators';

    export default {
        components: {
            datePicker
        },
        data: function () {
            return{
                benhnhan: {
                    name: null,
                    gender:null,
                    dob:null,
                    address: null,
                    yeu_cau: null,
                    email:null,
                    chuan_benh:null,
                    dieu_tri:null,
                    ky_hieu_rang:null,
                    tong_tien:null,
                    ngay_hen:null,
                    phone:null,
                    tien_su_benh: []
                },
                config: {
                    format: 'YYYY-MM-DD HH:mm:ss',
                    useCurrent: false,
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
                gender: {
                    required
                },
                dob: {
                    required
                },
                phone: {
                    required,
                    numeric:true,
                    minLength: minLength(10),
                    maxLength:maxLength(20)
                },
                address: {
                    required,
                    minLength: minLength(5),
                    maxLength:maxLength(200)
                }
            }
        },
        methods: {
            saveForm() {
                this.$v.benhnhan.$touch();
                if (!this.$v.$invalid) {
                    var app = this;
                    var newBenhnhan = app.benhnhan;
                    axios.post('/add-benhnhan', newBenhnhan)
                    .then(function (resp) {
                        app.$router.push({path: '/'});
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Không thể tạo mới");
                    });    
                }
            }
        }
    }
</script>
