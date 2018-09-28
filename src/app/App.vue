<style lang="scss">
@import '../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
<template>
    <div class="container">
        <div>
            <nav class="navbar navbar-default navbar-static-top navbar-fixed-top">
                <div class="container">
                    <div class="navbar-header">
                        <!-- Collapsed Hamburger -->
                        <button type="button" class="navbar-toggle collapsed" 
                        data-toggle="collapse" data-target="#app-navbar-collapse">
                            <span class="sr-only">Toggle Navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>

                        <!-- Branding Image -->
                        <router-link :to="{ name: 'home' }" class="navbar-brand">
                            <span class="glyphicon glyphicon-home"></span> Home</router-link>
                    </div>
                    <div class="collapse navbar-collapse" id="app-navbar-collapse">
                        <ul v-if="$auth.check()" class="nav navbar-nav">
                            <li>
                                <router-link :to="{ name: 'benh-nhan' }">
                                <span class="glyphicon glyphicon-user"></span> Khám bệnh
                                </router-link></li>
                        </ul>
                        <!-- Left Side Of Navbar -->
                        <ul v-if="$auth.check()" class="nav navbar-nav">
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" 
                                role="button" aria-expanded="false">
                                    <span class="glyphicon glyphicon-cog"></span> Hệ thống
                                    <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li><router-link :to="{ name: 'companies' }">
                            <span class="glyphicon glyphicon-cog"></span> Công ty</router-link></li>
                                    <li><router-link :to="{ name: 'home' }">
                            <span class="glyphicon glyphicon-user"></span> Người dùng</router-link></li>
                                </ul>
                            </li>
                        </ul>
                        <!-- Right Side Of Navbar -->
                        <ul class="nav navbar-nav navbar-right">
                            <!-- Authentication Links -->
                            <li v-if="!$auth.check()">
                                <router-link :to="{ name: 'login' }">
                                <span class="glyphicon glyphicon-log-in"></span> Đăng nhập
                                </router-link></li>
                            <li v-if="!$auth.check()"><router-link :to="{ name: 'register' }">
                                <span class="glyphicon glyphicon-registration-mark">
                                    </span> Đăng ký</router-link></li>

                            <li v-if="$auth.check()" class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" 
                                role="button" aria-expanded="false">
                                    Xin chào <strong> {{ $auth.user().name }} </strong>
                                    <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a href="#" @click.prevent="$auth.logout()">
                                            <span class="glyphicon glyphicon-log-out"></span> Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div> <br/><br/><br/>
        <div>
            <router-view></router-view>
        </div>
        <!-- <nav class="navbar navbar-default" role="navigation">
            <div class="container">
                footer
            </div>
        </nav> -->
    </div>
</template>