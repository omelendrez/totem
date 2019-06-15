/**
 * Simple Transaction POSNET Device Integrator API
 * Servicio Simple de Integración con el componente llamado PosnetDeviceIntegrator.<br /><br /> Contrato especificado según especificaciones https://www.openapis.org/ y https://swagger.io/.><br /><br />  En el site https://editor.swagger.io/ se dispone de un  Viewer, Editor y  Generar de Código ( SDK ) para varios lenguajes de programación; incluyendo JAVA, C#, C++, Perl, Node.js, GO, PHP, Ruby y otros.<br/><br/> Para <b>ver</b> la documentación o <b>generar</b> código de la librería cliente o SDK  se deberá seleccionar en el menú horizontal  la opción <b>File</b>, en el menú vertical que se depliega la opción <b>Import File</b> y luego se deberá seleccionar el archivo del contrato deseado, ya sea  extensión <b>.json</b> o <b>.yaml</b>. <br/><br/>Los clientes generados contienen, adicionalmente al código,  la documentación de uso del mismo en <b>README.md</b>, como también en el subdirectorio <b>docs</b> toda la documentación del API o servicio y sus operaciones, con el detalle de los  campos o elementos y su dominio.<br /><br />  A diferencia de con el <b>Servicio Avanzado</b> se puede realizar una transacción simplemente invocando entre una y dos <b>operaciones</b>.<br/><br/> Por ejemplo, para realizar una autorización de <b>Compra</b> se deberá invocar la operación <b>Buy</b>.<br /> Todas las operaciones financieras ( Categoría <b>Financial</b> ) deben ser confirmadas con la operación <b>ConfirmTransaction</b> ( a excepción de la misma ). Adicionalmente, si no se llegase a obtener respuesta en las operaciones de dicha categoria, se podrá obtener el resultado de la última operación realizada con la operación <b>GetLastTransaction</b>. <br /> <br /> En esta modalidad de integración, los servicios finalizarán si no se puede comunicar con la terminal, si la terminal retorna por cualquier condición o si pasaron mas de <b>300</b> segundos desde que se invocó el comando.<br /><br /> Por el momento es mandatorio el envío del elemento <b>TransactionRequestType</b> con el valor de la <b>operación</b> a realizar si la misma no se especifica en el <b>URL</b> o si se utiliza <b>TCP</b>.  Se soportan otros formatos de codificación además de <b>application/json</b>, ya sea para  la codificación de  los  requerimientos como la codificación  de la respuesta. Los nuevos formatos son <b>application/xml</b> y  <b>application/x-www-form-urlencoded</b>. El formato de codificación de los requerimientos enviados y el de las respuestas  a recibir se especifican en el <b>Header HTTP</b> con los elementos <b>Accept</b> y <b>Content-Type</b>, pudiéndose especificar formatos diferentes para los requerimientos ( <b>Content-Type</b> )  y las respuestas ( <b>Accept</b> ).<br/> Son soportados requerimientos utilizando el metodo HTTP <b>GET</b> en lugar de <b>POST</b>.  En este caso, todos los elementos que en el caso de usar POST se envían en el Body de la  transacción <b>HTTP</b> se enviarán en el <b>Query String</b> del <b>URL</b> del requerimiento.<br/><br/> <b>Ejemplo:</b><br/> http://localhost::8280/PosnetDeviceIntegrator/2.2.0/Financial/Buy?TransactionCurrencyCode=032&TransactionAmount=1.00&ReceiptNumber=1234567890<br/><br/> En caso de no especificarse en el Header HTTP  <b>Accept</b>, el formato de codificación para las respuestas será <b>JSON</b> para las operaciones realizadas utilizando <b>HTTP GET</b>, o el mismo que la codificación especificada para los requerimientos  ( <b>Content-Type</b> ) si se utilizó <b>HTTP POST</b>. <br/> <b><u>Características soportadas desde la versión 2.4.0</u></b><br/> Se da soporte a los dispositivos Clover Flex y Mini ( <b>http://www.la.clover.com</b> ) . En esta version solamente son soportados los Comandos <b>Buy</b>, <b>Void</b> y <b>Return</b>,<br/><br/>Los campos adicionales que seran obtenidos en una respuesta proveniente de un dispotivo Clover seran <b>PaymentID</b>, <b>OrderID</b>, <b>PaymentMethodID</b>, <b>TransactionTipAmount</b>, <b>TransactionTaxAmount</b>, <b>ExternalTransactionID</b>, <b>LastFourDigits</b>, <b>FirstSixDigits</b> y <b>CardHolderName</b>. A su vez, seran requeridos dos campos adicionales para poder realizar un Void y/o un Return, llamados <b>OrigPaymentID</b> y <b>OrigOrderID</b>. Estos valores son obtenidos en la respuesta de la operacion original que se quiere anular o devolver.<br/><br/>Se disponibiliza la posibilidad de elegir el o los tickets a imprimir en la terminal. A traves del elemento <b>TicketsToPrint</b> se podra indicar si se desea imprimir el ticket del cliente (<b>Customer</b>), del comercio(<b>Merchant</b>) o ambos (<b>Customer</b> y <b>Merchant</b>). <br/><br/> <b><u>Características soportadas desde la versión 2.0.0</u></b><br/> Se disponibiliza una nueva funcionalidad de <b>lectura y reconocimiento previo</b> del medio de pago a utilizar, habilitando la posibilidad de aplicar <b>descuentos y/o promociones</b>. Asimismo, será posible no continuar con la transacción, cancelando la lectura. Este escenario podría suceder si el comercio decidiera no operar con esa tarjeta. Este circuito se compone de dos nuevos tipos de transacciones, <b>GetCard</b> y <b>CancelGetCard</b>. <br/>Es soportado el <b>protocolo TCP para la interacción con el aplicativo</b>. Mediante la configuración previa en el archivo INI correspondiente, el usuario podrá indicar el tipo de codificación del cuerpo de los requerimientos. Son soportadas las mismas codificaciones utilizadas para HTTP. <br/>El funcionamiento de <b>ConfirmTransaction</b> es modificado por completo. De ahora en más, <b>el DeviceIntegrator contestará automáticamente como procesado exitosamente</b>. A partir de allí, se dispondrá a consultar el estado del dispositivo. Una vez que se informa que esta disponible para procesar nuevas operaciones enviaremos la petición de confirmación. De esta forma <b>se reduce el tiempo necesario para realizar una operación financiera</b>, gracias a que el punto de venta puede continuar su operatoria mientras el dispositivo imprime el ticket, se ingresa la firma, el DNI, etc.  <br/>El campo <b>CardType</b> contempla dos nuevos valores,  <b>Tax Free(T)</b> y <b>Unknown(U)</b>. De esta forma se cubren todos los posibles casos con los que el dispositivo podría tener que operar. <br/><br/><br/> &copy; 2017-2019 First Data Corporation. All rights reserved.<br /> The FIRST DATA name, logo and related trademarks and service marks, owned<br /> by First Data Corporation, are registered and/or used in the<br /> United States and many foreign countries. All other trademarks,<br /> service marks and trade names referenced in this site are the property<br /> of their respective owners.<br /> <br /> <br /> ANY USE, COPYING OR REPRODUCTION OF THE TRADEMARKS, LOGOS, INFORMATION,<br />  IMAGES OR DESIGNS CONTAINED IN THIS SITE IS STRICTLY<br />  PROHIBITED WITHOUT THE PRIOR WRITTEN PERMISSION OF FIRST DATA<br /> CORPORATION.<br /> <br />  
 *
 * OpenAPI spec version: 2.2.0
 * Contact: implementaciones@posnet.com.ar
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.4
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/BatchCloseRequest', 'model/BatchCloseResponse', 'model/BuyRequest', 'model/BuyResponse', 'model/BuyWithCashbackRequest', 'model/BuyWithCashbackResponse', 'model/CancelGetCardRequest', 'model/CancelGetCardResponse', 'model/ConfirmTransactionRequest', 'model/ConfirmTransactionResponse', 'model/CtlsBuyRequest', 'model/CtlsBuyResponse', 'model/CtlsReturnRequest', 'model/CtlsReturnResponse', 'model/CtlsVoidRequest', 'model/CtlsVoidResponse', 'model/CurrenciesRequest', 'model/CurrenciesResponse', 'model/GetCardRequest', 'model/GetCardResponse', 'model/GetLastTransactionRequest', 'model/GetLastTransactionResponse', 'model/PaymentMethodsRequest', 'model/PaymentMethodsResponse', 'model/ReturnRequest', 'model/ReturnResponse', 'model/VoidRequest', 'model/VoidResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/BatchCloseRequest'), require('../model/BatchCloseResponse'), require('../model/BuyRequest'), require('../model/BuyResponse'), require('../model/BuyWithCashbackRequest'), require('../model/BuyWithCashbackResponse'), require('../model/CancelGetCardRequest'), require('../model/CancelGetCardResponse'), require('../model/ConfirmTransactionRequest'), require('../model/ConfirmTransactionResponse'), require('../model/CtlsBuyRequest'), require('../model/CtlsBuyResponse'), require('../model/CtlsReturnRequest'), require('../model/CtlsReturnResponse'), require('../model/CtlsVoidRequest'), require('../model/CtlsVoidResponse'), require('../model/CurrenciesRequest'), require('../model/CurrenciesResponse'), require('../model/GetCardRequest'), require('../model/GetCardResponse'), require('../model/GetLastTransactionRequest'), require('../model/GetLastTransactionResponse'), require('../model/PaymentMethodsRequest'), require('../model/PaymentMethodsResponse'), require('../model/ReturnRequest'), require('../model/ReturnResponse'), require('../model/VoidRequest'), require('../model/VoidResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.SimpleTransactionPosnetDeviceIntegratorApi) {
      root.SimpleTransactionPosnetDeviceIntegratorApi = {};
    }
    root.SimpleTransactionPosnetDeviceIntegratorApi.AllApi = factory(root.SimpleTransactionPosnetDeviceIntegratorApi.ApiClient, root.SimpleTransactionPosnetDeviceIntegratorApi.BatchCloseRequest, root.SimpleTransactionPosnetDeviceIntegratorApi.BatchCloseResponse, root.SimpleTransactionPosnetDeviceIntegratorApi.BuyRequest, root.SimpleTransactionPosnetDeviceIntegratorApi.BuyResponse, root.SimpleTransactionPosnetDeviceIntegratorApi.BuyWithCashbackRequest, root.SimpleTransactionPosnetDeviceIntegratorApi.BuyWithCashbackResponse, root.SimpleTransactionPosnetDeviceIntegratorApi.CancelGetCardRequest, root.SimpleTransactionPosnetDeviceIntegratorApi.CancelGetCardResponse, root.SimpleTransactionPosnetDeviceIntegratorApi.ConfirmTransactionRequest, root.SimpleTransactionPosnetDeviceIntegratorApi.ConfirmTransactionResponse, root.SimpleTransactionPosnetDeviceIntegratorApi.CtlsBuyRequest, root.SimpleTransactionPosnetDeviceIntegratorApi.CtlsBuyResponse, root.SimpleTransactionPosnetDeviceIntegratorApi.CtlsReturnRequest, root.SimpleTransactionPosnetDeviceIntegratorApi.CtlsReturnResponse, root.SimpleTransactionPosnetDeviceIntegratorApi.CtlsVoidRequest, root.SimpleTransactionPosnetDeviceIntegratorApi.CtlsVoidResponse, root.SimpleTransactionPosnetDeviceIntegratorApi.CurrenciesRequest, root.SimpleTransactionPosnetDeviceIntegratorApi.CurrenciesResponse, root.SimpleTransactionPosnetDeviceIntegratorApi.GetCardRequest, root.SimpleTransactionPosnetDeviceIntegratorApi.GetCardResponse, root.SimpleTransactionPosnetDeviceIntegratorApi.GetLastTransactionRequest, root.SimpleTransactionPosnetDeviceIntegratorApi.GetLastTransactionResponse, root.SimpleTransactionPosnetDeviceIntegratorApi.PaymentMethodsRequest, root.SimpleTransactionPosnetDeviceIntegratorApi.PaymentMethodsResponse, root.SimpleTransactionPosnetDeviceIntegratorApi.ReturnRequest, root.SimpleTransactionPosnetDeviceIntegratorApi.ReturnResponse, root.SimpleTransactionPosnetDeviceIntegratorApi.VoidRequest, root.SimpleTransactionPosnetDeviceIntegratorApi.VoidResponse);
  }
}(this, function(ApiClient, BatchCloseRequest, BatchCloseResponse, BuyRequest, BuyResponse, BuyWithCashbackRequest, BuyWithCashbackResponse, CancelGetCardRequest, CancelGetCardResponse, ConfirmTransactionRequest, ConfirmTransactionResponse, CtlsBuyRequest, CtlsBuyResponse, CtlsReturnRequest, CtlsReturnResponse, CtlsVoidRequest, CtlsVoidResponse, CurrenciesRequest, CurrenciesResponse, GetCardRequest, GetCardResponse, GetLastTransactionRequest, GetLastTransactionResponse, PaymentMethodsRequest, PaymentMethodsResponse, ReturnRequest, ReturnResponse, VoidRequest, VoidResponse) {
  'use strict';

  /**
   * All service.
   * @module api/AllApi
   * @version 2.2.0
   */

  /**
   * Constructs a new AllApi. 
   * @alias module:api/AllApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the cancelGetCard operation.
     * @callback module:api/AllApi~cancelGetCardCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CancelGetCardResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Operación de Cancelación de Lectura de Tarjeta
     * Servicio utilizado para cancelar una lectura de tarjeta realizada previamente con un GetCard, la cual al final no será utilizada para realizar una operación financiera.
     * @param {Object} opts Optional parameters
     * @param {module:model/CancelGetCardRequest} opts.body Cuerpo del requerimiento para la cancelación de una lectura de tarjeta previa. Contendrá la información solicitada para realizarlo.
     * @param {module:api/AllApi~cancelGetCardCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CancelGetCardResponse}
     */
    this.cancelGetCard = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json', 'application/xml'];
      var accepts = ['application/json', 'application/xml'];
      var returnType = CancelGetCardResponse;

      return this.apiClient.callApi(
        '/Financial/CancelGetCard', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the confirmTransaction operation.
     * @callback module:api/AllApi~confirmTransactionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ConfirmTransactionResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Operación que Confirma una Transacción Financiera
     * Servicio utilizado para confirmar la recepción satisfactoria de la respuesta a una operación financiera.
     * @param {Object} opts Optional parameters
     * @param {module:model/ConfirmTransactionRequest} opts.body Cuerpo del requerimiento de confirmación. Contendrá la información solicitada para realizarlo.
     * @param {module:api/AllApi~confirmTransactionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ConfirmTransactionResponse}
     */
    this.confirmTransaction = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json', 'application/xml'];
      var accepts = ['application/json', 'application/xml'];
      var returnType = ConfirmTransactionResponse;

      return this.apiClient.callApi(
        '/Financial/ConfirmTransaction', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the currencies operation.
     * @callback module:api/AllApi~currenciesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CurrenciesResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Operación de consulta de Monedas
     * Servicio utilizado para obtener los tipos de monedas disponibles para utilizar en las operaciones financieras.
     * @param {Object} opts Optional parameters
     * @param {module:model/CurrenciesRequest} opts.body Cuerpo del requerimiento de consulta de monedas. Contendrá la información solicitada para realizarlo.
     * @param {module:api/AllApi~currenciesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CurrenciesResponse}
     */
    this.currencies = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json', 'application/xml'];
      var accepts = ['application/json', 'application/xml'];
      var returnType = CurrenciesResponse;

      return this.apiClient.callApi(
        '/Query/Currencies', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the doBatchClose operation.
     * @callback module:api/AllApi~doBatchCloseCallback
     * @param {String} error Error message, if any.
     * @param {module:model/BatchCloseResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Operación de Ciere de Lote
     * Servicio utilizado para realizar el cierre de lote de todos los hosts con los que el dispositivo opera.
     * @param {Object} opts Optional parameters
     * @param {module:model/BatchCloseRequest} opts.body Cuerpo del requerimiento de cierre de lote. Contendrá la información solicitada para realizarlo.
     * @param {module:api/AllApi~doBatchCloseCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/BatchCloseResponse}
     */
    this.doBatchClose = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json', 'application/xml'];
      var accepts = ['application/json', 'application/xml'];
      var returnType = BatchCloseResponse;

      return this.apiClient.callApi(
        '/Financial/BatchClose', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the doBuy operation.
     * @callback module:api/AllApi~doBuyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/BuyResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Operación de Compra
     * Servicio utilizado para enviar un requerimiento de compra.
     * @param {Object} opts Optional parameters
     * @param {module:model/BuyRequest} opts.body Cuerpo del requerimiento de compra. Contendrá la información solicitada para realizarlo.
     * @param {module:api/AllApi~doBuyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/BuyResponse}
     */
    this.doBuy = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json', 'application/xml'];
      var accepts = ['application/json', 'application/xml'];
      var returnType = BuyResponse;

      return this.apiClient.callApi(
        '/Financial/Buy', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the doBuyWithCashback operation.
     * @callback module:api/AllApi~doBuyWithCashbackCallback
     * @param {String} error Error message, if any.
     * @param {module:model/BuyWithCashbackResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Operación de Compra con Cashback
     * Servicio utilizado para enviar un requerimiento de compra con cashback.
     * @param {Object} opts Optional parameters
     * @param {module:model/BuyWithCashbackRequest} opts.body Cuerpo del requerimiento de compra con cashback. Contendrá la información solicitada para realizarlo.
     * @param {module:api/AllApi~doBuyWithCashbackCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/BuyWithCashbackResponse}
     */
    this.doBuyWithCashback = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json', 'application/xml'];
      var accepts = ['application/json', 'application/xml'];
      var returnType = BuyWithCashbackResponse;

      return this.apiClient.callApi(
        '/Financial/BuyWithCashback', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the doCtlsBuy operation.
     * @callback module:api/AllApi~doCtlsBuyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CtlsBuyResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Operación de Compra con modo de ingreso Contactless
     * Servicio utilizado para enviar un requerimiento de compra con tarjetas contactless.
     * @param {Object} opts Optional parameters
     * @param {module:model/CtlsBuyRequest} opts.body Cuerpo del requerimiento de compra. Contendrá la información solicitada para realizarlo.
     * @param {module:api/AllApi~doCtlsBuyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CtlsBuyResponse}
     */
    this.doCtlsBuy = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json', 'application/xml'];
      var accepts = ['application/json', 'application/xml'];
      var returnType = CtlsBuyResponse;

      return this.apiClient.callApi(
        '/Financial/CtlsBuy', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the doCtlsReturn operation.
     * @callback module:api/AllApi~doCtlsReturnCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CtlsReturnResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Operación de Devolución para tarjetas contactless
     * Servicio utilizado para enviar un requerimiento de devolución de compra con tarjetas contactless.
     * @param {Object} opts Optional parameters
     * @param {module:model/CtlsReturnRequest} opts.body Cuerpo del requerimiento de devolución. Contendrá la información solicitada para realizarlo.
     * @param {module:api/AllApi~doCtlsReturnCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CtlsReturnResponse}
     */
    this.doCtlsReturn = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json', 'application/xml'];
      var accepts = ['application/json', 'application/xml'];
      var returnType = CtlsReturnResponse;

      return this.apiClient.callApi(
        '/Financial/CtlsReturn', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the doCtlsVoid operation.
     * @callback module:api/AllApi~doCtlsVoidCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CtlsVoidResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Operación de Anulación para tarjetas contactless
     * Servicio utilizado para enviar un requerimiento de anulación de compra o devolución con tarjetas contactless.
     * @param {Object} opts Optional parameters
     * @param {module:model/CtlsVoidRequest} opts.body Cuerpo del requerimiento de anulación. Contendrá la información solicitada para realizarlo.
     * @param {module:api/AllApi~doCtlsVoidCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CtlsVoidResponse}
     */
    this.doCtlsVoid = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json', 'application/xml'];
      var accepts = ['application/json', 'application/xml'];
      var returnType = CtlsVoidResponse;

      return this.apiClient.callApi(
        '/Financial/CtlsVoid', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the doReturn operation.
     * @callback module:api/AllApi~doReturnCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ReturnResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Operación de Devolución
     * Servicio utilizado para enviar un requerimiento de devolución de compra.
     * @param {Object} opts Optional parameters
     * @param {module:model/ReturnRequest} opts.body Cuerpo del requerimiento de devolución. Contendrá la informacion solicitada para realizarlo.
     * @param {module:api/AllApi~doReturnCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ReturnResponse}
     */
    this.doReturn = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json', 'application/xml'];
      var accepts = ['application/json', 'application/xml'];
      var returnType = ReturnResponse;

      return this.apiClient.callApi(
        '/Financial/Return', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the doVoid operation.
     * @callback module:api/AllApi~doVoidCallback
     * @param {String} error Error message, if any.
     * @param {module:model/VoidResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Operación de Anulación
     * Servicio utilizado para enviar un requerimiento de anulación de compra o devolución.
     * @param {Object} opts Optional parameters
     * @param {module:model/VoidRequest} opts.body Cuerpo del requerimiento de anulación. Contendrá la información solicitada para realizarlo.
     * @param {module:api/AllApi~doVoidCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/VoidResponse}
     */
    this.doVoid = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json', 'application/xml'];
      var accepts = ['application/json', 'application/xml'];
      var returnType = VoidResponse;

      return this.apiClient.callApi(
        '/Financial/Void', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCard operation.
     * @callback module:api/AllApi~getCardCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCardResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Operación de Reconocimiento de Tarjeta
     * Servicio utilizado para realizar la lectura y reconocimiento de una tarjeta con el fin de poder aplicar promociones, descuentos, recargos, etc. en la operación financiera que se desea efectuar (ya sea una compra, una anulación, una devolución, etc.).
     * @param {Object} opts Optional parameters
     * @param {module:model/GetCardRequest} opts.body Cuerpo del requerimiento de reconocimiento de tarjeta. Contendrá la información solicitada para realizarlo.
     * @param {module:api/AllApi~getCardCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCardResponse}
     */
    this.getCard = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json', 'application/xml'];
      var accepts = ['application/json', 'application/xml'];
      var returnType = GetCardResponse;

      return this.apiClient.callApi(
        '/Financial/GetCard', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getLastTransaction operation.
     * @callback module:api/AllApi~getLastTransactionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetLastTransactionResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Operación de Consulta de Resultado de Operación luego de un timeout
     * Servicio utilizado para obtener el resultado de la última transacción financiera realizada si esta operación resultó en un timeout devuelto por el Device Integrator. Esta situación puede generarse cuando el usuario demora un tiempo mayor en ingresar los datos en el dispositivo que el máximo establecido para procesar una transacción.
     * @param {Object} opts Optional parameters
     * @param {module:model/GetLastTransactionRequest} opts.body Cuerpo del requerimiento de obtención de resultado de última operación. Contendrá la información solicitada para realizarlo.
     * @param {module:api/AllApi~getLastTransactionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetLastTransactionResponse}
     */
    this.getLastTransaction = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json', 'application/xml'];
      var accepts = ['application/json', 'application/xml'];
      var returnType = GetLastTransactionResponse;

      return this.apiClient.callApi(
        '/Query/GetLastTransaction', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the paymentMethods operation.
     * @callback module:api/AllApi~paymentMethodsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PaymentMethodsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Operación de Consulta de Medios de Pagos
     * Servicio utilizado para obtener los medios de pago disponibles para utilizar en las operaciones financieras.
     * @param {Object} opts Optional parameters
     * @param {module:model/PaymentMethodsRequest} opts.body Cuerpo del requerimiento de consulta de métodos de pago. Contendrá la información solicitada para realizarlo.
     * @param {module:api/AllApi~paymentMethodsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PaymentMethodsResponse}
     */
    this.paymentMethods = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json', 'application/xml'];
      var accepts = ['application/json', 'application/xml'];
      var returnType = PaymentMethodsResponse;

      return this.apiClient.callApi(
        '/Query/PaymentMethods', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
