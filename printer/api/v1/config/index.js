module.exports.header = () => {
  return [
    'EXTALL S.A.',
    'CUIT Nro.: 30-70835966-8',
    'DONADO 28 BAHIA BLANCA',
    'IVA RESPONSABLE INSCRIPTO',
    'A CONSUMIDOR FINAL',
    'P.V. Nro.: 0034'
  ]
}

const printers = [
  {
    id: 1,
    name: 'Totem thermal printer',
    interface: 'tcp://192.168.20.246'
  },
  {
    id: 2,
    name: 'Command thermal printer',
    interface: 'tcp://192.168.20.247'
  }
]

module.exports.getPrinter = id => printers.find(printer => printer.id === id)
