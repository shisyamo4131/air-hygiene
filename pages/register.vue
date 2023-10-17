<template>
  <v-card width="360" class="mx-auto" flat>
    <v-card-text>
      <v-img :src="img" />
    </v-card-text>
    <v-card-text class="pb-0 text-center">
      <v-form
        ref="form"
        v-model="formValid"
        :disabled="loading"
        @submit.prevent
      >
        <a-text-field
          v-model="params.email"
          label-jp="メールアドレス"
          label-en="email"
          prepend-icon="mdi-email"
          required
        />
        <a-text-field
          v-model="params.password"
          label-jp="パスワード"
          label-en="password"
          prepend-icon="mdi-key-variant"
          required
        />
        <a-text-field
          v-model="confirm"
          label-jp="再入力"
          label-en="password(confirm)"
          prepend-icon="mdi-key-variant"
          required
          :rules="rulesPasswordConfirm"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="!isConfirmed" color="primary" block @click="signUp()"
        >Sign Up</v-btn
      >
    </v-card-actions>
    <v-card-text>
      <v-btn text @click="$router.push('login')"
        ><v-icon left>mdi-chevron-left</v-icon>ログインに戻る</v-btn
      >
    </v-card-text>
    <v-snackbar v-model="snackbar" timeout="2000" color="error">
      <template #default>
        {{ errorMessage }}
      </template>
    </v-snackbar>
    <v-snackbar v-model="mailSend" timeout="3000" color="error">
      <template #default>
        登録のメールアドレスに認証メールを送信しました。
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from 'firebase/auth'
import ATextField from '~/components/atoms/inputs/ATextField.vue'
export default {
  components: {
    ATextField,
  },
  layout: 'public',
  data() {
    return {
      confirm: undefined,
      errorMessage: '',
      formValid: false,
      img: require('@/static/v.png'),
      loading: false,
      mailSend: false,
      params: { email: undefined, password: undefined },
      rulesPasswordConfirm: [
        (v) => v === this.params.password || 'パスワードが一致しません',
      ],
      snackbar: false,
    }
  },
  computed: {
    isConfirmed() {
      if (!this.params.password || !this.confirm) return false
      return this.params.password === this.confirm
    },
  },
  methods: {
    async signUp() {
      try {
        this.loading = true
        await createUserWithEmailAndPassword(
          this.$auth,
          this.params.email,
          this.params.password
        )
        await sendEmailVerification(this.$auth.currentUser)
        await signOut(this.$auth)
        this.mailSend = true
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
        this.showError(error)
      } finally {
        this.loading = false
      }
    },
    showError(err) {
      if (err.code === 'auth/email-already-in-use') {
        this.errorMessage = '既に登録されているメールアドレスです。'
      } else {
        this.errorMessage = err.code
      }
      this.snackbar = true
    },
  },
}
</script>

<style></style>
