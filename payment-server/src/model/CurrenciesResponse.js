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
    define(['ApiClient', 'model/CurrenciesResponseCurrencies'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./CurrenciesResponseCurrencies'));
  } else {
    // Browser globals (root is window)
    if (!root.SimpleTransactionPosnetDeviceIntegratorApi) {
      root.SimpleTransactionPosnetDeviceIntegratorApi = {};
    }
    root.SimpleTransactionPosnetDeviceIntegratorApi.CurrenciesResponse = factory(root.SimpleTransactionPosnetDeviceIntegratorApi.ApiClient, root.SimpleTransactionPosnetDeviceIntegratorApi.CurrenciesResponseCurrencies);
  }
}(this, function(ApiClient, CurrenciesResponseCurrencies) {
  'use strict';




  /**
   * The CurrenciesResponse model module.
   * @module model/CurrenciesResponse
   * @version 2.2.0
   */

  /**
   * Constructs a new <code>CurrenciesResponse</code>.
   * @alias module:model/CurrenciesResponse
   * @class
   */
  var exports = function() {
    var _this = this;













  };

  /**
   * Constructs a <code>CurrenciesResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CurrenciesResponse} obj Optional instance to populate.
   * @return {module:model/CurrenciesResponse} The populated <code>CurrenciesResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('ResultCode')) {
        obj['ResultCode'] = ApiClient.convertToType(data['ResultCode'], 'Number');
      }
      if (data.hasOwnProperty('ResultMessage')) {
        obj['ResultMessage'] = ApiClient.convertToType(data['ResultMessage'], 'String');
      }
      if (data.hasOwnProperty('DeviceType')) {
        obj['DeviceType'] = ApiClient.convertToType(data['DeviceType'], 'String');
      }
      if (data.hasOwnProperty('DeviceIntegratorVersion')) {
        obj['DeviceIntegratorVersion'] = ApiClient.convertToType(data['DeviceIntegratorVersion'], 'String');
      }
      if (data.hasOwnProperty('WorkstationInfo')) {
        obj['WorkstationInfo'] = ApiClient.convertToType(data['WorkstationInfo'], 'String');
      }
      if (data.hasOwnProperty('TransactionResponseType')) {
        obj['TransactionResponseType'] = ApiClient.convertToType(data['TransactionResponseType'], 'String');
      }
      if (data.hasOwnProperty('Session')) {
        obj['Session'] = ApiClient.convertToType(data['Session'], 'Number');
      }
      if (data.hasOwnProperty('LastUpdateDateTime')) {
        obj['LastUpdateDateTime'] = ApiClient.convertToType(data['LastUpdateDateTime'], 'String');
      }
      if (data.hasOwnProperty('Currencies')) {
        obj['Currencies'] = ApiClient.convertToType(data['Currencies'], [CurrenciesResponseCurrencies]);
      }
      if (data.hasOwnProperty('LastContractVersionAvailable')) {
        obj['LastContractVersionAvailable'] = ApiClient.convertToType(data['LastContractVersionAvailable'], 'String');
      }
      if (data.hasOwnProperty('ContractVersion')) {
        obj['ContractVersion'] = ApiClient.convertToType(data['ContractVersion'], 'String');
      }
      if (data.hasOwnProperty('ResponseActions')) {
        obj['ResponseActions'] = ApiClient.convertToType(data['ResponseActions'], 'String');
      }
    }
    return obj;
  }

  /**
   * Código de respuesta generado por el Device Integrator.
   * @member {Number} ResultCode
   */
  exports.prototype['ResultCode'] = undefined;
  /**
   * Descripción del código de respuesta generado por el Device Integrator.
   * @member {String} ResultMessage
   */
  exports.prototype['ResultMessage'] = undefined;
  /**
   * Tipo de dispositivo con el que interactúa este aplicativo, y el cual será utilizado para realizar las peticiones que sean procesadas por el Device Integrator
   * @member {String} DeviceType
   */
  exports.prototype['DeviceType'] = undefined;
  /**
   * Versión del Device Integrator utilizada.
   * @member {String} DeviceIntegratorVersion
   */
  exports.prototype['DeviceIntegratorVersion'] = undefined;
  /**
   * Tipos de datos que caracterizan al hardware y software del sistema donde se encuentra ejecutando el Device Integrator. La información que se encuentra presente es:<br /> <b>1)</b> Tipo de sistema operativo<br /> <b>2)</b> Tipo de plataforma <br /><b>3)</b> Release del sistema operativo <br /><b>4)</b> Tipo de arquitectura del hardware<br /> <b>5)</b> Nombre de la PC <br /><b>6)</b> Versión de NodeJS utilizada para ejecutar este aplicativo<br /> <b>7)</b> Identificador (PID) del proceso. Cada uno de estos datos estara separado por un ; 
   * @member {String} WorkstationInfo
   */
  exports.prototype['WorkstationInfo'] = undefined;
  /**
   * Tipo de Operación o Transacción que se ha realizado.
   * @member {module:model/CurrenciesResponse.TransactionResponseTypeEnum} TransactionResponseType
   */
  exports.prototype['TransactionResponseType'] = undefined;
  /**
   * Número de sesión.
   * @member {Number} Session
   */
  exports.prototype['Session'] = undefined;
  /**
   * Fecha y hora de la última actualización de los tipos de monedas disponibles en el dispositivo.
   * @member {String} LastUpdateDateTime
   */
  exports.prototype['LastUpdateDateTime'] = undefined;
  /**
   * Array de elementos JSON que contendrá cada uno de los distintos tipos de monedas informados por el dispositivo.
   * @member {Array.<module:model/CurrenciesResponseCurrencies>} Currencies
   */
  exports.prototype['Currencies'] = undefined;
  /**
   * Última version del contrato disponible para el aplicativo instalado.
   * @member {String} LastContractVersionAvailable
   */
  exports.prototype['LastContractVersionAvailable'] = undefined;
  /**
   * Versión del contrato con la cual fue generada esta respuesta. Si no se ha solicitado una versión en particular mediante la url de la petición, se enviará el mismo valor que en el campo LastContractVersionAvailable.
   * @member {String} ContractVersion
   */
  exports.prototype['ContractVersion'] = undefined;
  /**
   * Serie de palabras claves, separadas por comas, que indicarán las acciones que el aplicativo que recibe la respuesta debe realizar. Los acciones disponibles son las siguientes: Approve - Refuse - WithHold - IssuerCall - ConfigurationError - SystemError - ResourceError - ProcessError
   * @member {String} ResponseActions
   */
  exports.prototype['ResponseActions'] = undefined;


  /**
   * Allowed values for the <code>TransactionResponseType</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TransactionResponseTypeEnum = {
    /**
     * value: "Currencies"
     * @const
     */
    "Currencies": "Currencies"  };


  return exports;
}));


