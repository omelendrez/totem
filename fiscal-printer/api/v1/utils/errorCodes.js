const errorCodes = [
  { code: '1000001', description: 'El puerto se encuentra en uso.' },
  { code: '1000002', description: 'Puerto inválido.' },
  { code: '1000003', description: 'El puerto ya se encuentra abierto.' },
  { code: '1000004', description: 'El puerto ya se encuentra cerrado.' },
  { code: '1000005', description: 'Error de inicialización.' },
  { code: '1000006', description: 'Puerto cerrado.' },
  { code: '1000007', description: 'Longitud máxima alcanzada.' },
  { code: '1000008', description: 'Campo de datos no inválido.' },
  { code: '1000009', description: 'Operación en progreso.' },
  { code: '100000A', description: 'Error de escritura.' },
  { code: '100000B', description: 'Error de tiempo de espera (Timeout).' },
  { code: '100000C', description: 'Byte 0x15 recibido (NAK).' },
  { code: '100000D', description: 'Índice inválido.' },
  { code: '5000001', description: 'Tabla de texto extra llena.' },
  { code: '5000002', description: 'Tamaño insuficiente del string de destino al que copiar información.' },
  { code: '5000003', description: 'Nombre o razón social número #1 del cliente con error.' },
  { code: '5000004', description: 'Nombre o razón social número #2 del cliente con error.' },
  { code: '5000005', description: 'Domicilio número #1 del cliente con error.' },
  { code: '5000006', description: 'Domicilio número #2 del cliente con error.' },
  { code: '5000007', description: 'Domicilio número #3 del cliente con error.' },
  { code: '5000008', description: 'Identificador de Documento cliente con error.' },
  { code: '5000009', description: 'Número de documento del cliente con error.' },
  { code: '500000A', description: 'Identificador de responsabilidad ante el IVA del cliente con error.' },
  { code: '500000B', description: 'Tabla de comprobante asociado llena.' },
  { code: '500000C', description: 'Puntero nulo a estructura de comando fiscal.' },
  { code: '500000D', description: 'Puntero nulo a estructura de respuesta fiscal.' },
  { code: '500000E', description: 'No existe comprobante abierto a fin de cerrarlo.' },
  { code: '500000F', description: 'No existe comprobante abierto a fin de cancelarlo.' },
  { code: '5000010', description: 'Tipo de comprobante inválido en función AbrirComprobante.' },
  { code: '5000011', description: 'Identificador modificador Inválido en función ImprimirItem.' },
  { code: '5000012', description: 'Tipo de comprobante inválido en función ImprimirItem.' },
  { code: '5000013', description: 'Error con relación a los impuestos internos en función ImprimirItem.' },
  { code: '5000014', description: 'Identificador modificador Inválido en función CargarAjuste.' },
  { code: '5000015', description: 'No existe comprobante abierto a fin de cargar ajuste.' },
  { code: '5000016', description: 'No existe comprobante abierto a fin de cargar otros tributos.' },
  { code: '5000017', description: 'Identificador modificador Inválido en función CargarPago.' },
  { code: '5000018', description: 'No existe comprobante abierto a fin de cargar pago.' },
  { code: '5000019', description: 'No existe comprobante abierto a fin de imprimir subtotal.' },
  { code: '500001A', description: 'Filtro inválido en función Consultar.' },
  { code: '500001B', description: 'No existe comprobante abierto a fin de consultar información del comprobante.' },
  { code: '500001C', description: 'No existe comprobante abierto a fin de consultar el tipo de comprobante.' },
  { code: '500001D', description: 'Vinculo de conexión inexistente (puerto cerrado) al intentar comunicarse.' },
  { code: '500001E', description: 'Equipo ocupado con una comunicación. Se recomienda intentar comunicarse más tarde.' },
  { code: '500001F', description: 'Puntero nulo a estructura de comando fiscal, al intentar comunicarse.' },
  { code: '5000020', description: 'Número de encabezado inválido.' },
  { code: '5000021', description: 'Búsqueda de patrón en campo string no encontrado.' },
  { code: '5000022', description: 'Búsqueda de patrón numérico en campo string no encontrado.' },
  { code: '5000023', description: 'Tamaño insuficiente del string de destino al que copiar información numérica.' },
  { code: '5000024', description: 'Equipo disponible para comunicarse (IDLE).' },
  { code: '5000025', description: 'Equipo ocupado.' },
  { code: '5000026', description: 'Sin Conexión.' },
  { code: '5000027', description: 'Estado del equipo desconocido.' },
  { code: '5000028', description: 'Número de cola inválido.' },
  { code: '5000029', description: 'Filtro inválido en función Configurar.' },
  { code: '500002A', description: 'Tipo de consulta inválida en función.' },
  { code: '500002B', description: 'Versión del equipo conectado desconocida.' },
  { code: '500002C', description: 'Imposible crear archivo de descarga. Verifique el nombre del directorio.' },
  { code: '500002D', description: 'Error en la escritura del archivo de descarga.' },
  { code: '500002E', description: 'Formato de fecha/hora inválido.' },
  { code: '500002F', description: 'Imposible aplicar cancelación.' },
  { code: '5000030', description: 'Error en el número de campo.' },
  { code: '5000031', description: 'Identificador modificador no soportado en función ImprimirItem, para este tipo de impresor fiscal.' },
  { code: '5000032', description: 'Identificador del tipo de consulta de estado no soportado.' },
  { code: '5000033', description: 'Código de error no encontrado.' },
  { code: '5000034', description: 'Imposible abrir archivo de logo de usuario, a fin de calcular el tamaño.' },
  { code: '5000035', description: 'Se pudo abrir archivo de logo de usuario, pero no se puede calcular su tamaño.' },
  { code: '5000036', description: 'Imposible de reservar espacio en memoria RAM, para el tratar el logo de usuario.' },
  { code: '5000037', description: 'Imposible abrir archivo de logo de usuario.' },
  { code: '5000038', description: 'Imposible convertir logo de usuario de formato png a formato raster.' },
  { code: '5000039', description: 'Imposible de reservar espacio en memoria RAM, para el tratar el logo de usuario en formato raster.' },
  { code: '5000040', description: 'Imposible de reservar espacio en memoria RAM, para las filas de la matriz de conversión del logo de usuario.' },
  { code: '5000041', description: 'Imposible de reservar espacio en memoria RAM, para las columnas de la matriz de conversión del logo de usuario.' },
  { code: '5000042', description: 'Alto del logo de usuario mayor al máximo soportado.' },
  { code: '5000043', description: 'La cantidad máxima de campos a sido alcanzada.' },
  { code: '5000044', description: 'El formato de la trama es inválido.' },
  { code: '5000045', description: 'Número del tipo de comprobante asociado inválido.' },
  { code: '5000046', description: 'Número de punto de venta de comprobante asociado inválido.' },
  { code: '5000047', description: 'Número de comprobante asociado inválido.' },
  { code: '5000048', description: 'Tipo de comprobante no soportado en impresoras de generación anterior, al consultar último número de comprobante emitido.' },
  { code: '5000049', description: 'Fecha no encontrada en herramienta que retorna la fecha de una jornada.' },
  { code: '5000050', description: 'El RTC del controlador fiscal se encuentra atrasado respecto de la última jornada a descargar.' },
  { code: '5000051', description: 'No existe rango de período disponible para descargar.' },
  { code: '5000052', description: 'Memoria insuficiente para alocar estructura de comando.' },
  { code: '5000053', description: 'Memoria insuficiente para alocar estructura de respuesta de comando.' },
  { code: '5000054', description: 'Memoria insuficiente en función según código de error.' },
  { code: '5000055', description: 'Memoria insuficiente en función según código de error.' },
  { code: '5000056', description: 'Reservado.' },
  { code: '5000057', description: 'Memoria insuficiente en función según código de error.' },
  { code: '5000058', description: 'Memoria insuficiente en función según código de error.' },
  { code: '5000059', description: 'Memoria insuficiente en función según código de error.' },
  { code: '5000060', description: 'Memoria insuficiente en función según código de error.' },
  { code: '5000061', description: 'Fecha o número de cierre Z ingresado inválido.' },
  { code: '5000062', description: 'Número de cierre Z no encontrado.' },
  { code: '5000063', description: 'Memoria insuficiente en función según código de error.' },
  { code: '5000064', description: 'Memoria insuficiente en función según código de error.' },
  { code: '5000065', description: 'Fecha de jornada no encontrada.' },
  { code: '5000066', description: 'No existen descargas pendientes.' },
  { code: '5000067', description: 'Memoria insuficiente en función según código de error.' },
  { code: '5000068', description: 'Espacio insuficiente en varible [fecha] a fin de rellenar con información.' },
  { code: '5000069', description: 'Imposible obtener el EPOCH del RTC del controlador fiscal.' },
  { code: '500006A', description: 'Imposible obtener el EPOCH del RTC de la PC.' },
  { code: '500006B', description: 'Printer buffer error.' },
  { code: '5000064', description: 'Funcionalidad no implementada.' },
  { code: '5000064', description: 'Error fuera de rango (error desconocido).' },
  { code: 'FFFFFFD', description: 'Error interno.' }
]

module.exports.errorCodes = errorCodes