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
    root.SimpleTransactionPosnetDeviceIntegratorApi.CtlsBuyResponse = factory(root.SimpleTransactionPosnetDeviceIntegratorApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The CtlsBuyResponse model module.
   * @module model/CtlsBuyResponse
   * @version 2.2.0
   */

  /**
   * Constructs a new <code>CtlsBuyResponse</code>.
   * @alias module:model/CtlsBuyResponse
   * @class
   */
  var exports = function() {
    var _this = this;









































  };

  /**
   * Constructs a <code>CtlsBuyResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CtlsBuyResponse} obj Optional instance to populate.
   * @return {module:model/CtlsBuyResponse} The populated <code>CtlsBuyResponse</code> instance.
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
      if (data.hasOwnProperty('HostResultCode')) {
        obj['HostResultCode'] = ApiClient.convertToType(data['HostResultCode'], 'Number');
      }
      if (data.hasOwnProperty('HostResultMessage')) {
        obj['HostResultMessage'] = ApiClient.convertToType(data['HostResultMessage'], 'String');
      }
      if (data.hasOwnProperty('TransactionResponseType')) {
        obj['TransactionResponseType'] = ApiClient.convertToType(data['TransactionResponseType'], 'String');
      }
      if (data.hasOwnProperty('Session')) {
        obj['Session'] = ApiClient.convertToType(data['Session'], 'Number');
      }
      if (data.hasOwnProperty('TransactionDate')) {
        obj['TransactionDate'] = ApiClient.convertToType(data['TransactionDate'], 'String');
      }
      if (data.hasOwnProperty('TransactionTime')) {
        obj['TransactionTime'] = ApiClient.convertToType(data['TransactionTime'], 'String');
      }
      if (data.hasOwnProperty('CardType')) {
        obj['CardType'] = ApiClient.convertToType(data['CardType'], 'String');
      }
      if (data.hasOwnProperty('CardTypeDescription')) {
        obj['CardTypeDescription'] = ApiClient.convertToType(data['CardTypeDescription'], 'String');
      }
      if (data.hasOwnProperty('PaymentMethodDescription')) {
        obj['PaymentMethodDescription'] = ApiClient.convertToType(data['PaymentMethodDescription'], 'String');
      }
      if (data.hasOwnProperty('MerchantPaymentMethodID')) {
        obj['MerchantPaymentMethodID'] = ApiClient.convertToType(data['MerchantPaymentMethodID'], 'String');
      }
      if (data.hasOwnProperty('MerchantPaymentMethodType')) {
        obj['MerchantPaymentMethodType'] = ApiClient.convertToType(data['MerchantPaymentMethodType'], 'String');
      }
      if (data.hasOwnProperty('MerchantPaymentMethodSupportsCashback')) {
        obj['MerchantPaymentMethodSupportsCashback'] = ApiClient.convertToType(data['MerchantPaymentMethodSupportsCashback'], 'String');
      }
      if (data.hasOwnProperty('CardNumber')) {
        obj['CardNumber'] = ApiClient.convertToType(data['CardNumber'], 'String');
      }
      if (data.hasOwnProperty('CardInputMode')) {
        obj['CardInputMode'] = ApiClient.convertToType(data['CardInputMode'], 'String');
      }
      if (data.hasOwnProperty('CardInputModeDescription')) {
        obj['CardInputModeDescription'] = ApiClient.convertToType(data['CardInputModeDescription'], 'String');
      }
      if (data.hasOwnProperty('HostAuthorizationCode')) {
        obj['HostAuthorizationCode'] = ApiClient.convertToType(data['HostAuthorizationCode'], 'String');
      }
      if (data.hasOwnProperty('HostTicketNumber')) {
        obj['HostTicketNumber'] = ApiClient.convertToType(data['HostTicketNumber'], 'Number');
      }
      if (data.hasOwnProperty('TransactionCurrencySymbol')) {
        obj['TransactionCurrencySymbol'] = ApiClient.convertToType(data['TransactionCurrencySymbol'], 'String');
      }
      if (data.hasOwnProperty('TransactionAmount')) {
        obj['TransactionAmount'] = ApiClient.convertToType(data['TransactionAmount'], 'Number');
      }
      if (data.hasOwnProperty('AccountType')) {
        obj['AccountType'] = ApiClient.convertToType(data['AccountType'], 'Number');
      }
      if (data.hasOwnProperty('AccountTypeDescription')) {
        obj['AccountTypeDescription'] = ApiClient.convertToType(data['AccountTypeDescription'], 'String');
      }
      if (data.hasOwnProperty('TransactionFacilitiesType')) {
        obj['TransactionFacilitiesType'] = ApiClient.convertToType(data['TransactionFacilitiesType'], 'String');
      }
      if (data.hasOwnProperty('TransactionInstallments')) {
        obj['TransactionInstallments'] = ApiClient.convertToType(data['TransactionInstallments'], 'Number');
      }
      if (data.hasOwnProperty('HostMerchantIdentification')) {
        obj['HostMerchantIdentification'] = ApiClient.convertToType(data['HostMerchantIdentification'], 'String');
      }
      if (data.hasOwnProperty('HostTerminalIdentification')) {
        obj['HostTerminalIdentification'] = ApiClient.convertToType(data['HostTerminalIdentification'], 'String');
      }
      if (data.hasOwnProperty('ListCode')) {
        obj['ListCode'] = ApiClient.convertToType(data['ListCode'], 'String');
      }
      if (data.hasOwnProperty('TransactionCashbackAmount')) {
        obj['TransactionCashbackAmount'] = ApiClient.convertToType(data['TransactionCashbackAmount'], 'Number');
      }
      if (data.hasOwnProperty('ReceiptNumber')) {
        obj['ReceiptNumber'] = ApiClient.convertToType(data['ReceiptNumber'], 'String');
      }
      if (data.hasOwnProperty('HostIdentification')) {
        obj['HostIdentification'] = ApiClient.convertToType(data['HostIdentification'], 'Number');
      }
      if (data.hasOwnProperty('HostBatchNumber')) {
        obj['HostBatchNumber'] = ApiClient.convertToType(data['HostBatchNumber'], 'Number');
      }
      if (data.hasOwnProperty('PhoneCompanyIdentification')) {
        obj['PhoneCompanyIdentification'] = ApiClient.convertToType(data['PhoneCompanyIdentification'], 'String');
      }
      if (data.hasOwnProperty('PhoneCompanyDescription')) {
        obj['PhoneCompanyDescription'] = ApiClient.convertToType(data['PhoneCompanyDescription'], 'String');
      }
      if (data.hasOwnProperty('CustomerPhone')) {
        obj['CustomerPhone'] = ApiClient.convertToType(data['CustomerPhone'], 'Number');
      }
      if (data.hasOwnProperty('OperationCode')) {
        obj['OperationCode'] = ApiClient.convertToType(data['OperationCode'], 'Number');
      }
      if (data.hasOwnProperty('IssuerEntity')) {
        obj['IssuerEntity'] = ApiClient.convertToType(data['IssuerEntity'], 'Number');
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
   * Código de respuesta generado por el Host a la transacción enviada.
   * @member {Number} HostResultCode
   */
  exports.prototype['HostResultCode'] = undefined;
  /**
   * Descripción del código de respuesta generado por el Host a la transacción enviada.
   * @member {String} HostResultMessage
   */
  exports.prototype['HostResultMessage'] = undefined;
  /**
   * Tipo de Operación o Transacción que se ha realizado.
   * @member {module:model/CtlsBuyResponse.TransactionResponseTypeEnum} TransactionResponseType
   */
  exports.prototype['TransactionResponseType'] = undefined;
  /**
   * Número de sesión.
   * @member {Number} Session
   */
  exports.prototype['Session'] = undefined;
  /**
   * Fecha. Dependiendo del tipo de mensaje será la fecha actual del POS o la fecha del POS al momento de realizar la transacción.
   * @member {String} TransactionDate
   */
  exports.prototype['TransactionDate'] = undefined;
  /**
   * Hora. Dependiendo del tipo de mensaje será la hora actual del POS o la hora del POS al momento de realizar la transacción.
   * @member {String} TransactionTime
   */
  exports.prototype['TransactionTime'] = undefined;
  /**
   * Tipo de tarjeta con la que se realizó la transacción. Hay una lista de posibles valores.
   * @member {module:model/CtlsBuyResponse.CardTypeEnum} CardType
   */
  exports.prototype['CardType'] = undefined;
  /**
   * Descripción del tipo de tarjeta con la que se realizó la transacción. Hay una lista de posibles valores.
   * @member {module:model/CtlsBuyResponse.CardTypeDescriptionEnum} CardTypeDescription
   */
  exports.prototype['CardTypeDescription'] = undefined;
  /**
   * Nombre del emisor con el cual se realizó la transacción.
   * @member {String} PaymentMethodDescription
   */
  exports.prototype['PaymentMethodDescription'] = undefined;
  /**
   * Identificador del medio de pago utilizado por el sistema integrado al DeviceIntegrator. La relación entre el CardAbbreviation y este identificador se configura en al archivo MerchantPaymentMethodIDs, localizado en la carpeta etc.
   * @member {String} MerchantPaymentMethodID
   */
  exports.prototype['MerchantPaymentMethodID'] = undefined;
  /**
   * ID utilizado para caracterizar al medio de pago de distintas formas, como puede ser 'Tarjeta de crédito/débito', 'Tarjeta de beneficios', etc. La relación entre el CardAbbreviation y este identificador es personalizable por el cliente, gracias al archivo localizado en la carpeta etc, llamado MerchantPaymentMethodIDs.
   * @member {String} MerchantPaymentMethodType
   */
  exports.prototype['MerchantPaymentMethodType'] = undefined;
  /**
   * Indica si el medio de pago utilizado soporta cashback o no. La relación entre el CardAbbreviation y este identificador es personalizable por el cliente, gracias al archivo localizado en la carpeta etc, llamado MerchantPaymentMethodIDs.
   * @member {module:model/CtlsBuyResponse.MerchantPaymentMethodSupportsCashbackEnum} MerchantPaymentMethodSupportsCashback
   */
  exports.prototype['MerchantPaymentMethodSupportsCashback'] = undefined;
  /**
   * Número de tarjeta o PAN de la tarjeta con la cual se realizó la transacción. El dato podrá venir en claro o enmascarado con asteriscos. El formato y cantidad de dígitos enmascarados los decide el dispositivo.
   * @member {String} CardNumber
   */
  exports.prototype['CardNumber'] = undefined;
  /**
   * Forma en la cual se realizó el ingreso de la tarjeta. Hay una lista de posibles valores.
   * @member {module:model/CtlsBuyResponse.CardInputModeEnum} CardInputMode
   */
  exports.prototype['CardInputMode'] = undefined;
  /**
   * Descripción de la forma en la cual se realizó el ingreso de la tarjeta. Hay una lista de posibles valores.
   * @member {module:model/CtlsBuyResponse.CardInputModeDescriptionEnum} CardInputModeDescription
   */
  exports.prototype['CardInputModeDescription'] = undefined;
  /**
   * Código de autorización de la transacción realizada. El valor devuelto puede ser numérico o alfanumérico. Puede estar justificado a izquierda o derecha, dependiendo de cómo lo informó el emisor de la tarjeta que autorizó la operación.
   * @member {String} HostAuthorizationCode
   */
  exports.prototype['HostAuthorizationCode'] = undefined;
  /**
   * Número de ticket asociado a la transacción.
   * @member {Number} HostTicketNumber
   */
  exports.prototype['HostTicketNumber'] = undefined;
  /**
   * Tipo de moneda con la cual se realizó la transacción. El tipo de moneda enviado será el símbolo asignado a cada uno. Los valores a enviar serán los mismos que se enviaron en el campo Symbol en la operación de consulta de monedas.
   * @member {String} TransactionCurrencySymbol
   */
  exports.prototype['TransactionCurrencySymbol'] = undefined;
  /**
   * Monto por el cual se realizó la transacción.
   * @member {Number} TransactionAmount
   */
  exports.prototype['TransactionAmount'] = undefined;
  /**
   * Tipo de cuenta asociada a una operación de Débito.
   * @member {Number} AccountType
   */
  exports.prototype['AccountType'] = undefined;
  /**
   * Descripción del tipo de cuenta asociada a una operación de Débito.
   * @member {module:model/CtlsBuyResponse.AccountTypeDescriptionEnum} AccountTypeDescription
   */
  exports.prototype['AccountTypeDescription'] = undefined;
  /**
   * Tipo de plan con el cual se realizó la transacción.
   * @member {String} TransactionFacilitiesType
   */
  exports.prototype['TransactionFacilitiesType'] = undefined;
  /**
   * Cantidad de cuotas con la cual se realizó la transacción.
   * @member {Number} TransactionInstallments
   */
  exports.prototype['TransactionInstallments'] = undefined;
  /**
   * Código de comercio que se utilizó al realizar la transacción.
   * @member {String} HostMerchantIdentification
   */
  exports.prototype['HostMerchantIdentification'] = undefined;
  /**
   * Número de terminal con el cual se identifica el dispositivo ante el Host que autorizó la transacción.
   * @member {String} HostTerminalIdentification
   */
  exports.prototype['HostTerminalIdentification'] = undefined;
  /**
   * Campo que no se encuentra en uso actualmente por el dispositivo.
   * @member {String} ListCode
   */
  exports.prototype['ListCode'] = undefined;
  /**
   * Importe del Cash Back.
   * @member {Number} TransactionCashbackAmount
   */
  exports.prototype['TransactionCashbackAmount'] = undefined;
  /**
   * Número de factura – Ticket con el cual está asociada la transacción y con el que fue ingresada en el dispositivo o enviada en la solicitud original de la transacción.
   * @member {String} ReceiptNumber
   */
  exports.prototype['ReceiptNumber'] = undefined;
  /**
   * Número del Host autorizador asociado a la operación. Con este dato podrá contabilizar y corroborar la cantidad de operaciones que se cerraron en la operación de cierre de lote de cada Host que concilió el dispositivo.
   * @member {Number} HostIdentification
   */
  exports.prototype['HostIdentification'] = undefined;
  /**
   * Número de lote al que pertenece la transacción. Se debe tener en cuenta que cada Host mantiene su propio contador de transacciones.
   * @member {Number} HostBatchNumber
   */
  exports.prototype['HostBatchNumber'] = undefined;
  /**
   * Operador GRE con el cual se realizó la recarga.
   * @member {module:model/CtlsBuyResponse.PhoneCompanyIdentificationEnum} PhoneCompanyIdentification
   */
  exports.prototype['PhoneCompanyIdentification'] = undefined;
  /**
   * Descripción del operador GRE con el cual se realizó la recarga.
   * @member {module:model/CtlsBuyResponse.PhoneCompanyDescriptionEnum} PhoneCompanyDescription
   */
  exports.prototype['PhoneCompanyDescription'] = undefined;
  /**
   * Número de teléfono al cual se le realizó la recarga.
   * @member {Number} CustomerPhone
   */
  exports.prototype['CustomerPhone'] = undefined;
  /**
   * Número de operación con el cual identifica la Telefónica la recarga realizada.
   * @member {Number} OperationCode
   */
  exports.prototype['OperationCode'] = undefined;
  /**
   * Código de entidad emisora para todas las tarjetas que son procesadas por First Data.
   * @member {Number} IssuerEntity
   */
  exports.prototype['IssuerEntity'] = undefined;
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
     * value: "CtlsBuy"
     * @const
     */
    "CtlsBuy": "CtlsBuy"  };

  /**
   * Allowed values for the <code>CardType</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CardTypeEnum = {
    /**
     * value: "C"
     * @const
     */
    "C": "C",
    /**
     * value: "D"
     * @const
     */
    "D": "D",
    /**
     * value: "P"
     * @const
     */
    "P": "P",
    /**
     * value: "T"
     * @const
     */
    "T": "T",
    /**
     * value: "U"
     * @const
     */
    "U": "U"  };

  /**
   * Allowed values for the <code>CardTypeDescription</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CardTypeDescriptionEnum = {
    /**
     * value: "Credit"
     * @const
     */
    "Credit": "Credit",
    /**
     * value: "Debit"
     * @const
     */
    "Debit": "Debit",
    /**
     * value: "Points"
     * @const
     */
    "Points": "Points",
    /**
     * value: "Tax Free"
     * @const
     */
    "Tax Free": "Tax Free",
    /**
     * value: "Unknown"
     * @const
     */
    "Unknown": "Unknown"  };

  /**
   * Allowed values for the <code>MerchantPaymentMethodSupportsCashback</code> property.
   * @enum {String}
   * @readonly
   */
  exports.MerchantPaymentMethodSupportsCashbackEnum = {
    /**
     * value: "0"
     * @const
     */
    "0": "0",
    /**
     * value: "1"
     * @const
     */
    "1": "1"  };

  /**
   * Allowed values for the <code>CardInputMode</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CardInputModeEnum = {
    /**
     * value: "L"
     * @const
     */
    "L": "L"  };

  /**
   * Allowed values for the <code>CardInputModeDescription</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CardInputModeDescriptionEnum = {
    /**
     * value: "CONTACTLESS"
     * @const
     */
    "CONTACTLESS": "CONTACTLESS"  };

  /**
   * Allowed values for the <code>AccountTypeDescription</code> property.
   * @enum {String}
   * @readonly
   */
  exports.AccountTypeDescriptionEnum = {
    /**
     * value: "Caja de ahorro en pesos"
     * @const
     */
    "Caja de ahorro en pesos": "Caja de ahorro en pesos",
    /**
     * value: "Cuenta corriente en pesos"
     * @const
     */
    "Cuenta corriente en pesos": "Cuenta corriente en pesos",
    /**
     * value: "Caja de ahorro en dolares"
     * @const
     */
    "Caja de ahorro en dolares": "Caja de ahorro en dolares",
    /**
     * value: "Cuenta corriente en dolares"
     * @const
     */
    "Cuenta corriente en dolares": "Cuenta corriente en dolares"  };

  /**
   * Allowed values for the <code>PhoneCompanyIdentification</code> property.
   * @enum {String}
   * @readonly
   */
  exports.PhoneCompanyIdentificationEnum = {
    /**
     * value: "C"
     * @const
     */
    "C": "C",
    /**
     * value: "M"
     * @const
     */
    "M": "M",
    /**
     * value: "P"
     * @const
     */
    "P": "P",
    /**
     * value: "MP"
     * @const
     */
    "MP": "MP",
    /**
     * value: "GDT"
     * @const
     */
    "GDT": "GDT"  };

  /**
   * Allowed values for the <code>PhoneCompanyDescription</code> property.
   * @enum {String}
   * @readonly
   */
  exports.PhoneCompanyDescriptionEnum = {
    /**
     * value: "Claro"
     * @const
     */
    "Claro": "Claro",
    /**
     * value: "Movistar"
     * @const
     */
    "Movistar": "Movistar",
    /**
     * value: "Personal"
     * @const
     */
    "Personal": "Personal",
    /**
     * value: "MovilPark"
     * @const
     */
    "MovilPark": "MovilPark",
    /**
     * value: "Gran DT"
     * @const
     */
    "Gran DT": "Gran DT"  };


  return exports;
}));


