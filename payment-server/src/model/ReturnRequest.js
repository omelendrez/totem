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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.SimpleTransactionPosnetDeviceIntegratorApi) {
      root.SimpleTransactionPosnetDeviceIntegratorApi = {};
    }
    root.SimpleTransactionPosnetDeviceIntegratorApi.ReturnRequest = factory(root.SimpleTransactionPosnetDeviceIntegratorApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ReturnRequest model module.
   * @module model/ReturnRequest
   * @version 2.2.0
   */

  /**
   * Constructs a new <code>ReturnRequest</code>.
   * @alias module:model/ReturnRequest
   * @class
   * @param transactionRequestType {module:model/ReturnRequest.TransactionRequestTypeEnum} Tipo de Operación o Transacción que se quiere realizar.
   * @param transactionResolutionMode {module:model/ReturnRequest.TransactionResolutionModeEnum} Forma de resolución en la que será realizada la transacción. Si este valor no es recibido, habrá uno a utilizar por default. Para poder realizar una operación de forma offline, el dispositivo solicitará el código de autorización correspondiente por pantalla.
   */
  var exports = function(transactionRequestType, transactionResolutionMode) {
    var _this = this;

    _this['TransactionRequestType'] = transactionRequestType;

    _this['TransactionResolutionMode'] = transactionResolutionMode;












  };

  /**
   * Constructs a <code>ReturnRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ReturnRequest} obj Optional instance to populate.
   * @return {module:model/ReturnRequest} The populated <code>ReturnRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('TransactionRequestType')) {
        obj['TransactionRequestType'] = ApiClient.convertToType(data['TransactionRequestType'], 'String');
      }
      if (data.hasOwnProperty('TransactionCurrencyCode')) {
        obj['TransactionCurrencyCode'] = ApiClient.convertToType(data['TransactionCurrencyCode'], 'String');
      }
      if (data.hasOwnProperty('TransactionResolutionMode')) {
        obj['TransactionResolutionMode'] = ApiClient.convertToType(data['TransactionResolutionMode'], 'String');
      }
      if (data.hasOwnProperty('TransactionAmount')) {
        obj['TransactionAmount'] = ApiClient.convertToType(data['TransactionAmount'], 'Number');
      }
      if (data.hasOwnProperty('TransactionInstallments')) {
        obj['TransactionInstallments'] = ApiClient.convertToType(data['TransactionInstallments'], 'Number');
      }
      if (data.hasOwnProperty('OriginalTicketNumber')) {
        obj['OriginalTicketNumber'] = ApiClient.convertToType(data['OriginalTicketNumber'], 'Number');
      }
      if (data.hasOwnProperty('OriginalDate')) {
        obj['OriginalDate'] = ApiClient.convertToType(data['OriginalDate'], 'String');
      }
      if (data.hasOwnProperty('ReceiptNumber')) {
        obj['ReceiptNumber'] = ApiClient.convertToType(data['ReceiptNumber'], 'String');
      }
      if (data.hasOwnProperty('CardAbbreviation')) {
        obj['CardAbbreviation'] = ApiClient.convertToType(data['CardAbbreviation'], 'String');
      }
      if (data.hasOwnProperty('HostMerchantIdentification')) {
        obj['HostMerchantIdentification'] = ApiClient.convertToType(data['HostMerchantIdentification'], 'String');
      }
      if (data.hasOwnProperty('MerchantName')) {
        obj['MerchantName'] = ApiClient.convertToType(data['MerchantName'], 'String');
      }
      if (data.hasOwnProperty('MerchantCUIT')) {
        obj['MerchantCUIT'] = ApiClient.convertToType(data['MerchantCUIT'], 'String');
      }
      if (data.hasOwnProperty('OriginalPaymentID')) {
        obj['OriginalPaymentID'] = ApiClient.convertToType(data['OriginalPaymentID'], 'String');
      }
      if (data.hasOwnProperty('OriginalOrderID')) {
        obj['OriginalOrderID'] = ApiClient.convertToType(data['OriginalOrderID'], 'String');
      }
      if (data.hasOwnProperty('TicketsToPrint')) {
        obj['TicketsToPrint'] = ApiClient.convertToType(data['TicketsToPrint'], ['String']);
      }
    }
    return obj;
  }

  /**
   * Tipo de Operación o Transacción que se quiere realizar.
   * @member {module:model/ReturnRequest.TransactionRequestTypeEnum} TransactionRequestType
   */
  exports.prototype['TransactionRequestType'] = undefined;
  /**
   * Tipo de moneda que se utilizará para realizar la transacción. Si este valor no es enviado hacia el dispositivo, será solicitado en su pantalla para ser elegido entre los disponibles.
   * @member {module:model/ReturnRequest.TransactionCurrencyCodeEnum} TransactionCurrencyCode
   */
  exports.prototype['TransactionCurrencyCode'] = undefined;
  /**
   * Forma de resolución en la que será realizada la transacción. Si este valor no es recibido, habrá uno a utilizar por default. Para poder realizar una operación de forma offline, el dispositivo solicitará el código de autorización correspondiente por pantalla.
   * @member {module:model/ReturnRequest.TransactionResolutionModeEnum} TransactionResolutionMode
   * @default 'Online'
   */
  exports.prototype['TransactionResolutionMode'] = 'Online';
  /**
   * Monto a utilizar en la transacción. Posee un formato específico. Si este valor no es enviado hacia el dispositivo, será solicitado en su pantalla para ser ingresado.
   * @member {Number} TransactionAmount
   */
  exports.prototype['TransactionAmount'] = undefined;
  /**
   * Cantidad de cuotas en las que se realizará la transacción. Si este valor no es enviado hacia el dispositivo, será solicitado en su pantalla para ser ingresado.
   * @member {Number} TransactionInstallments
   */
  exports.prototype['TransactionInstallments'] = undefined;
  /**
   * Si la transacción a realizar es una devolución, será necesario poseer el número de ticket de la transacción original. Este valor puede ser recibido en la petición y, en caso contrario, será solicitado por el dispositivo en su pantalla.
   * @member {Number} OriginalTicketNumber
   */
  exports.prototype['OriginalTicketNumber'] = undefined;
  /**
   * Si la transacción a realizar es una devolución, será necesario poseer la fecha de la transacción original. Este valor puede ser recibido en la petición y, en caso contrario, será solicitado por el dispositivo en su pantalla. Posee un formato específico que debe ser cumplido.
   * @member {String} OriginalDate
   */
  exports.prototype['OriginalDate'] = undefined;
  /**
   * Número de factura al cual se asociará el ticket de esta transacción. Si este valor no es enviado hacia el dispositivo, será solicitado en su pantalla para ser ingresado. Puede dejarse vacío, y así será impreso en el ticket. 
   * @member {String} ReceiptNumber
   */
  exports.prototype['ReceiptNumber'] = undefined;
  /**
   * Este dato solo se envía en caso de que se desee administrar el código de comercio con el cual se debe realizar la transacción. En este campo se debe enviar la Abreviatura de la tarjeta recibida en la solicitud de Consulta de Medios de Pagos.
   * @member {String} CardAbbreviation
   */
  exports.prototype['CardAbbreviation'] = undefined;
  /**
   * Este dato se puede enviar solo si se ha enviado el campo CardAbbrevation. Indica el código de comercio con el cual se desea asociar la transacción solicitada.
   * @member {String} HostMerchantIdentification
   */
  exports.prototype['HostMerchantIdentification'] = undefined;
  /**
   * Este dato se puede enviar solo si se ha enviado el campo CardAbbrevation. Indica el nombre del comercio o alguna descripción.
   * @member {String} MerchantName
   */
  exports.prototype['MerchantName'] = undefined;
  /**
   * Este dato se puede enviar solo si se ha enviado el campo CardAbbrevation. Indica el CUIT del comercio. Este campo se imprimirá en el ticket.
   * @member {String} MerchantCUIT
   */
  exports.prototype['MerchantCUIT'] = undefined;
  /**
   * ID de pago obtenido en la respuesta de la peticion orignal que se desea anular o devolver. Este campo es solo requerido para operar con dispositivos Clover
   * @member {String} OriginalPaymentID
   */
  exports.prototype['OriginalPaymentID'] = undefined;
  /**
   * ID de orden obtenido en la respuesta de la peticion orignal que se desea anular o devolver. Este campo es solo requerido para operar con dispositivos Clover
   * @member {String} OriginalOrderID
   */
  exports.prototype['OriginalOrderID'] = undefined;
  /**
   * Array utilizado para indicar el/los tickets que se desea imprimir
   * @member {Array.<module:model/ReturnRequest.TicketsToPrintEnum>} TicketsToPrint
   */
  exports.prototype['TicketsToPrint'] = undefined;


  /**
   * Allowed values for the <code>TransactionRequestType</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TransactionRequestTypeEnum = {
    /**
     * value: "Return"
     * @const
     */
    "Return": "Return"  };

  /**
   * Allowed values for the <code>TransactionCurrencyCode</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TransactionCurrencyCodeEnum = {
    /**
     * value: "32"
     * @const
     */
    "32": "32",
    /**
     * value: "840"
     * @const
     */
    "840": "840"  };

  /**
   * Allowed values for the <code>TransactionResolutionMode</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TransactionResolutionModeEnum = {
    /**
     * value: "Online"
     * @const
     */
    "Online": "Online",
    /**
     * value: "Offline"
     * @const
     */
    "Offline": "Offline"  };

  /**
   * Allowed values for the <code>ticketsToPrint</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TicketsToPrintEnum = {
    /**
     * value: "Merchant"
     * @const
     */
    "Merchant": "Merchant",
    /**
     * value: "Customer"
     * @const
     */
    "Customer": "Customer"  };


  return exports;
}));


