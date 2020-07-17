<template>
  <b-container class="gray" >
    <b-row v-if="completition != 3">
      <b-col cols="12">
          <ul class="completition-form-bar">
            <div class="line">
            <div class="complete" v-bind:style="{width: line_width + (step * completition) + 'px'}"></div>
            </div>
            <li :class="{'active': completition >= 0}">
              <span class="title">Dados de pagamento</span>
              <span class="circle"><font-awesome-icon class="icon" icon="check" /></span>
            </li>
            <li :class="{'active': completition == 1}">
              <span class="title">Confirmação</span>
              <span class="circle"><font-awesome-icon class="icon" icon="check" /></span>
            </li>
          </ul>
      </b-col>

    </b-row>

    <b-row class="mt-5 pb-5" :class="{'justify-content-center': completition == 1}">
      <b-col cols="12" md="8" order="2" order-md="1">

        <b-overlay :show="loading" rounded="sm">  
          
          <div v-if="completition == 0">
            <h5>Dados de pagamento</h5>
            <div class="wrapper-box">
              <h5>Dados pessoais</h5>
              <b-form @submit.prevent="onSubmit()" novalidate>
                <b-row>
                  <b-col cols="12" md="6">
                    <b-form-group label="CPF ou CNPJ" label-for="cpf_cnpj">
                      <b-form-input id="cpf_cnpj" v-model="data.cpf_cnpj"  type="text" name="cpf_cnpj" :state="submit ? !errors.has('cpf_cnpj') : null" v-validate="'required|cpf_cnpj'" v-mask="['###.###.###-##', '##.###.###/####-##']" autocomplete="off"></b-form-input>
                      <b-form-invalid-feedback :state="submit ? !errors.has('cpf_cnpj') : null">
                        Por favor, preencha seu CPF ou CNPJ.
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col cols="12">
                      <h5>Cartão de crédito</h5>

                      <b-row>
                        <b-col cols="12" md="6">

                        <b-form-group label="Número" label-for="card_number">
                          <b-form-input id="card_number" v-model="data.card_number" type="text" name="card_number" :state="submit ? !(errors.has('card_number') || card_number_error) : null" v-validate="'required'" v-mask="generateCardNumberMask" v-on:focus="focusInput" v-on:blur="blurInput" data-ref="cardNumber" autocomplete="off"></b-form-input>
                          <b-form-invalid-feedback :state="submit ? !(errors.has('card_number') || card_number_error ) : null">
                            Por favor, preencha o número do cartão de crédito.
                          </b-form-invalid-feedback>
                        </b-form-group>

                          <b-form-group label="Nome completo" label-for="card_holder_name">
                            <b-form-input id="card_holder_name" v-model="data.card_holder_name" type="text" name="card_holder_name" :state="submit ? !errors.has('card_holder_name') : null" v-validate="'required'" v-on:focus="focusInput" v-on:blur="blurInput" data-ref="cardName" autocomplete="off"></b-form-input>
                            <b-form-invalid-feedback :state="submit ? !errors.has('card_holder_name') : null">
                              Por favor, preencha o nome impresso no cartão de crédito.
                            </b-form-invalid-feedback>
                          </b-form-group>

                        <b-row>
                          <b-col cols="12" md="6">
                            <b-form-group label="Validade" label-for="valid">
                              <b-form-input id="valid" v-model="data.card_expiration_date" type="text" name="valid" :state="submit ? !errors.has('valid') : null" v-validate="'required'" v-mask="'##/##'" autocomplete="off"></b-form-input>
                              <b-form-invalid-feedback :state="submit ? !errors.has('valid') : null">
                                Por favor, preencha a validade.
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </b-col>

                          <b-col cols="12" md="6">

                          <b-form-group label="CVV" label-for="card_cvv">
                            <b-form-input id="card_cvv" v-model="data.card_cvv" type="text" name="card_cvv" :state="submit ? !errors.has('card_cvv') : null" v-validate="'required'" maxlength="4" v-mask="'####'" v-on:focus="flipCard(true)" v-on:blur="flipCard(false)" autocomplete="off" ></b-form-input>
                            <b-form-invalid-feedback :state="submit ? !errors.has('card_cvv') : null">
                              Por favor, preencha o número CVV do cartão de crédito.
                            </b-form-invalid-feedback>
                          </b-form-group>
                          </b-col>
                        </b-row>
                        </b-col>


                          <b-col cols="12" md="6">
                            <!-- Credit card -->
                            <card 
                            ref="card" 
                            :card_number="data.card_number" 
                            :card_holder_name="data.card_holder_name" 
                            :card_month="data.card_expiration_date.substr(0, 2)" 
                            :card_year="data.card_expiration_date.substr(1, 4)" 
                            :card_cvv="data.card_cvv" />

                          </b-col>

                        </b-row>
                        

                  
                  </b-col>
                </b-row>
              </b-form>
            </div>
          </div>

          <!-- Confirmation -->
          <div v-if="completition == 1 && charge_success">
            <h5>Sucesso</h5>
            <div class="wrapper-box success">
              <b-row class="justify-content-center my-5">
                  <div class="icon">
                    <font-awesome-icon icon="check"/>
                  </div>
              </b-row>
              <h5 class="text-center">Sua compra foi efetuada com sucesso!</h5>


              <b-row v-if="!method_credit_card">
                <h5 class="text-center">Seu boleto foi gerado, você pode visualizá-lo clicando abaixo.</h5>
                <a :href="ticket_url" target="_blank" class="btn btn-primary col-12" v-if="ticket_url.length > 0"><font-awesome-icon icon="file-invoice-dollar"/> Visualiar boleto</a>
              </b-row>

            </div>
          </div>

          <!-- Failed -->
          <div v-if="completition == 1 && charge_error">
            <h5>Transação não finalizada</h5>
            <div class="wrapper-box failed">
              <b-row class="justify-content-center my-5">
                  <div class="icon">
                    <font-awesome-icon icon="times"/>
                  </div>
              </b-row>
              <h5 class="text-center">{{ error_message }}</h5>

            </div>
          </div>

        </b-overlay>

      </b-col>

      <b-col cols="12" md="4" class="mb-3 mb-md-0" order="1" order-md="2" v-if="completition != 1">
        <h5>Detalhes</h5>
        <div class="wrapper-box">
            <b-row>
            
              <b-col cols="12" class="product-container">
                <b-row>
                  <b-col cols="12">
                    <h4>{{ product.name }}</h4>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col cols="12" md="5">
                  <b-img v-if="product.images.length > 0" rounded alt="Rounded image" fluid :src="baseURL + product.images[0].path"></b-img>
                  </b-col>
                  <b-col cols="12" md="7">
                    {{ product.description.length > 100 ? product.description.substr(0, 200) + '...' : product.description }}
                  </b-col>
                </b-row>
              </b-col>
            </b-row>

 
              <h5 class="text-green font-weight-bold">Valor <span class="float-right">R$ {{ product.amount }}</span></h5>

            <hr />  

            <b-row class="mt-2">
              <b-button class="col-12 btn-green" :disabled="loading" type="button" variant="primary" @click="onSubmit()">Atualizar assinatura</b-button>
            </b-row>

          </div>
      </b-col>

    </b-row>

  </b-container>
</template>
<script>
import PaymentService from "@/services/resources/PaymentService";
import ProductService from "@/services/resources/ProductService";
import Card from './Card';
import pagarme from '@/assets/js/pagarme.min';

const servicePayment = PaymentService.build();
const serviceProduct = ProductService.build();

export default {
  components:{
    Card
  },
  data () {
    return {
      data: {
        cpf_cnpj: '',
        card_number: '',
        card_holder_name: '',
        card_valid: '',
        card_expiration_date: '',
        card_year: '',
        card_month: '',
        card_cvv: '',
      },
      line_width: 370,
      step: 300,
      completition: 0,
      submit: false,
      charge_success: false,
      charge_error: false,
      error_message: '',
      card_number_error: false,
      loading: false,
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      minCardYear: new Date().getFullYear(),
      product: {
        images: [{ path: ''}],
        name: '',
        description: ''
      },
    }
  },
  computed:{
    baseURL(){
      return process.env.VUE_APP_API_HOST;
    },
    generateCardNumberMask () {
      return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
    },
     minCardMonth () {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
        return 1;
    },
  },
  watch: {
    data:{
      card_year(){
        if (this.data.card_month < this.minCardMonth) {
          this.data.card_month = "";
        }
      }
    }
  },
  methods: {
    flipCard (status) {
        this.$refs.card.flipCard(status);
    },
    focusInput (e) {
        this.$refs.card.focusInput(e);
    },
    blurInput() {
        this.$refs.card.blurInput();
    },
    onSubmit(scope){
      
        this.submit = true;
        this.$validator.validateAll(scope).then((result) => {
          
          if(result){
            this.loading = true;

            let card = {
              card_number: this.data.card_number,
              card_holder_name: this.data.card_holder_name,
              card_expiration_date: this.data.card_expiration_date,
              card_cvv: this.data.card_cvv
            };

            var cardValidations = pagarme.validate({card: card});
            
            // Check if the card number is valid
            if(!cardValidations.card.card_number){
              this.card_number_error = true;
              this.loading = false;
              return;
            }

            // Success, so send the data to the server in order
            // to make the transaction
            let data = {
              id: this.product.id,
              cpf_cnpj: this.data.cpf_cnpj,
              card_number: this.data.card_number,
              card_holder_name: this.data.card_holder_name,
              card_expiration_date: this.data.card_expiration_date.replace('/', ''),
              card_cvv: this.data.card_cvv
            };

            servicePayment
              .update(data)
              .then(response => {
                if(response.success){
                  this.charge_success = true;
                }else{
                  this.charge_error = true;
                  if(response.code == '0404'){
                    this.error_message = 'Nenhuma assinatura foi efetuada com este CPF/CNPJ.';
                  }else if(response.code == '1404'){
                    this.error_message = 'Esse produto não é uma assinatura.';
                  }else if(response.code == '1405'){
                    this.error_message = 'Não há nenhuma assinatura vinculada a este CPF/CNPJ.';
                  }
                }
                this.completition = 1;
                this.loading = false;
              
              }).catch(err => {
                this.loading = false;
                this.charge_error = true;
                this.completition = 1;
              });
                  
          }
        });
    },
    getProduct(slug){

      let data = {
        id: slug
      };

      serviceProduct
      .read(data)
      .then(response => {
        this.product = response;
      })
      .catch(err => {
        console.log(err);
      });
    },
  },
  mounted(){
    var slug = this.$route.params.product;
    this.getProduct(slug);
  }

  }
</script>

<style lang="scss">
@import '../../assets/scss/variables.scss';

.completition-form-bar{
  list-style: none;
  padding-top: 15px;
  margin: 0;
  display: block;
  width: 100%;
  height: 100px;
  text-align: center;
  position: relative;

  .line{
      position: absolute;
      display: block;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      height: 2px;
      background: #bbb;

    .complete{
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 240px;
      height: 2px;
      background: #00897b;
    }
  }

  li{
    display: inline-block;
    width: 200px;
    height: 30px;
    margin-right: 100px;

    .title{
      display: block;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 16px;
    }
    .circle{
      display: inline-block;
      position: relative;
      width: 25px;
      height: 25px;
      background: #fff;
      border: 2px #999 solid;
      border-radius: 50%;
      .icon{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: none;
        font-size: 13px;
      }
    }
  }

  .active{
    .title{
      color: #00897b;
    }
    .circle{
      border: 2px #00897b solid !important;
      .icon{
        display: block;
        color: #00897b;
      }
    }
  }
    
}

// FIRST STEP FORM
h5{
  color: #444;
  font-weight: 500;    
  font-size: 24px;
  letter-spacing: 1px;
  margin-bottom: 20px;
}
.wrapper-box{
  background: #fff;
  border: 1px #ddd solid;
  border-radius: 5px;
  padding: 25px;

  h4{
    text-transform: uppercase;
    color: #222;
    font-weight: 300;    
    font-size: 20px;
    letter-spacing: 1px;
  }

  h5{
    font-size: 18px;
    font-weight: normal;
  }

  form{
    label{
      font-size: 15px;
    }
  }

  .product-container{
    margin-bottom: 20px;
  }

  .text-green{
    color: #00897b
  }

}

.small-text{
  font-size: 12px;
}

.success{
  .icon{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: $base-color;
    color: #fff;
    font-size: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h5{
    font-size: 24px;
  }

  border-bottom: 4px $base-color solid;
}

.failed{
  .icon{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #dc3545;
    color: #fff;
    font-size: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h5{
    font-size: 24px;
  }

  border-bottom: 4px #dc3545 solid;
}

* {
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
}

</style>