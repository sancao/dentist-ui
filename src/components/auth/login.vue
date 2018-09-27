<template>
    <div>
        <div class="alert alert-danger" v-if="user.error">
            <p>There was an error, unable to sign in with those credentials.</p>
        </div>
        <form autocomplete="off" @submit.prevent="login" method="post">
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="text" id="email"
                placeholder="user@example.com" 
                class="form-control"
                v-model="user.email"
                v-on:input="$v.user.email.$touch"
                v-bind:class="{'error': $v.user.email.$error, 
                'valid': $v.user.email.$dirty 
                && !$v.user.email.$invalid}">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" 
                class="form-control" 
                v-model="user.password"
                v-on:input="$v.user.password.$touch"
                v-bind:class="{'error': $v.user.password.$error, 
                'valid': $v.user.password.$dirty 
                && !$v.user.password.$invalid}">
            </div>
            <button class="btn btn-default">
              <span class="glyphicon glyphicon-save"></span> Lưu
            </button>
        </form>
    </div>
</template>


<script>
/* eslint-disable */
  import { required, minLength,maxLength,email,url } from 'vuelidate/lib/validators';

  export default {
    data(){
      return {
        user:{
          email: null,
          password: null,
          error: false
        }
      }
    },
    validations: {
        user: {
            email: {
                required,
                email,
                minLength: minLength(5),
                maxLength:maxLength(200)
            },
            password: {
                required,
                minLength: minLength(5),
                maxLength:maxLength(200)
            }
        }
    },
    methods: {
      login(){
        debugger;
        this.$v.user.$touch();
        if (!this.$v.$invalid) {
          var app = this
          this.$auth.login({
              params: {
                email: app.user.email,
                password: app.user.password
              }, 
              success: function () {},
              error: function () {},
              rememberMe: true,
              redirect: '/dashboard',
              fetchUser: true,
          });
        }       
      }
    }
  } 
</script>