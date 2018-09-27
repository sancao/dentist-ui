<template>
    <div>
        <div class="form-group">
            <div class="row">
                <div class="col-sm-4 col-xs-6">
                    <router-link :to="{name: 'new-benh-nhan'}" class="btn btn-success">
                    <span class="glyphicon glyphicon-plus"></span> Tạo mới</router-link>
                </div>
                <div class="col-sm-8 col-xs-6 pull-right">
                    <input type="text" class="form-control" 
                    v-model="filterValue" maxlenght="50" 
                    placeholder="Filter by anything..."/>

                    <div class="input-group">
                        <input type="text" class="form-control"
                         v-model="searchValue" maxlenght="50"
                            placeholder="Search by anything...">
                        <div class="input-group-btn">
                            <button class="btn btn-primary" type="button"
                            name="submit" @click="getCompaniesPaging(pagination.current_page)"
                                id="submit">
                                <i class="glyphicon glyphicon-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <table class="table table-bordered table-striped table-responsive">
                <thead>
                    <tr>
                        <th>Logo</th>
                        <th @click="sortBy('name')">
                            Tên
                            <span class="arrow" :class="sortOrders['name'] > 0 ? 'asc' : 'dsc'">
                            </span>
                        </th>
                        <th @click="sortBy('address')">Địa chỉ
                            <span class="arrow" :class="sortOrders['address'] > 0 ? 'asc' : 'dsc'">
                            </span>
                        </th>
                        <th @click="sortBy('email')">Email
                            <span class="arrow" :class="sortOrders['email'] > 0 ? 'asc' : 'dsc'">
                            </span>
                        </th>
                        <th @click="sortBy('website')">Website
                            <span class="arrow" :class="sortOrders['website'] > 0 ? 'asc' : 'dsc'">
                            </span>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='(pk, index) in filteredAndSortedData' :key='index'>
                        <td>
                            <img class="circle-image" :src="pk.icon">
                        </td>
                        <td>{{ pk.name }}</td>
                        <td>{{ pk.address }}</td>
                        <td>{{ pk.website }}</td>
                        <td>{{ pk.email }}</td>
                        <td>
                            <router-link :to="{name: 'edit-company', params: {id: pk.id}}" 
                            class="btn btn-xs btn-default">
                            <span class="glyphicon glyphicon-pencil"></span> Sửa
                            </router-link>
                            <a href="#"
                            class="btn btn-xs btn-danger"
                            v-on:click="deleteEntry(pk.id, index)">
                                <span class="glyphicon glyphicon-remove"></span> Xóa
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="form-group">
            <ul class="pagination hidden-xs pull-right">
                <li v-if="pagination.current_page > 1">
                    <a href="#" aria-label="Previous"
                    @click.prevent="changePage(pagination.current_page - 1)">
                        <!-- <span aria-hidden="true">«</span> -->
                        <span aria-hidden="true" class="glyphicon glyphicon-fast-backward"></span>
                    </a>
                </li>
                <li v-for="(page,index) in pagesNumber" :key='index'
                    v-bind:class="[ page == isActived ? 'active' : '']">
                    <a href="#"
                    @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li v-if="pagination.current_page < pagination.last_page">
                    <a href="#" aria-label="Next"
                    @click.prevent="changePage(pagination.current_page + 1)">
                        <!-- <span aria-hidden="true">»</span> -->
                        <span aria-hidden="true" class="glyphicon glyphicon-fast-forward"></span>
                    </a>
                </li>
            </ul>
        </div> 
    </div>
</template>

<script>
/* eslint-disable */
    export default {
        data: function () {
            return {
                filterValue: '',
                searchValue:'',
                sortKey:'', 
                sortOrders: [],
                benhnhan: [],
                columns: ['name','address','email','website'],
                pagination: {
                    total: 0, 
                    per_page: 2,
                    from: 1, 
                    to: 0,
                    current_page: 1
                },
                offset: 4,
                pagesNumber:[],
                isActived:''
            }
        },
        mounted() {
            let vm=this;
            vm.columns.forEach(function (key) {
                vm.sortOrders[key] = 1;
            });

            vm.getBenhNhanPaging(vm.pagination.current_page);
        },
        computed: {
            filteredAndSortedData() {
                let vm=this;
                let sortKey = vm.sortKey;
                let order = vm.sortOrders[sortKey] || 1;
                // Apply filter first
                let result = vm.benhnhan;
                if (vm.filterValue) {
                    result = result.filter(item =>vm.searchLike(item));
                }
                // Sort the remaining values
                if(vm.sortKey==='') return result;
                
                vm.sortKey='';
                return result.slice().sort(function (a, b) {
                    a = a[sortKey];
                    b = b[sortKey];
                    return (a === b ? 0 : a > b ? 1 : -1) * order;
                });
            }
        },
        methods: {
            getBenhNhanPaging(page){
                let vm = this;
                debugger;
                axios.get('/benhnhan?page='+page+'&text='+vm.searchValue)
                    .then(function (resp) {
                        debugger;
                        vm.benhnhan=resp.data.data.data.data;
                        vm.pagination= resp.data.data.pagination;
                        vm.pagesNumber=vm.getPagesNumber(resp.data.data.data);
                        vm.isActived=vm.getIsActived(resp.data.data.pagination);
                    })
                    .catch(function (resp) {
                        debugger;
                        console.log(resp);
                        alert("Không thế hiển thị danh sách công ty, đã có lỗi !!!");
                });
            },
            deleteEntry(id, index) {
                if (confirm("Bạn thật sự muốn xóa?")) {
                    let app = this;
                    axios.delete('/benhnhan/' + id)
                        .then(function (resp) {
                            app.benhnhan.splice(index, 1);
                        })
                        .catch(function (resp) {
                            alert("Could not delete company");
                        });
                }
            },
            searchLike:function(item){
                return item.name.includes(this.filterValue)
                ||item.email.includes(this.filterValue)
                ||item.phone.includes(this.filterValue)
                ||item.address.includes(this.filterValue);
            },

            isNumeric:function(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            },
            getIsActived: function (pagination) {
                return pagination.current_page;
            },
            getPagesNumber: function (pagination) {
                if (!pagination.to) {
                    return [];
                }
                var from = pagination.current_page - this.offset;
                if (from < 1) {
                    from = 1;
                }
                var to = from + (this.offset * 2);
                if (to >= pagination.last_page) {
                    to = pagination.last_page;
                }
                var pagesArray = [];
                while (from <= to) {
                    pagesArray.push(from);
                    from++;
                }
                return pagesArray;
            },
            changePage: function (page) {
                this.pagination.current_page = page;
                this.getCompaniesPaging(page);
            },
            sortBy: function(sortKey) { 
                debugger;
                this.sortKey = sortKey;
                this.sortOrders[sortKey] = this.sortOrders[sortKey] * -1;
            }
        }
    }
</script>
