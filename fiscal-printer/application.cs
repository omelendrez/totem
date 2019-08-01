using System;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace EpsonFiscalInterface
{
  public class Startup
  {
    public async Task<object> Invoke(object input)
    {
      int v = (int)input;
      return ImpresoraFiscal.ImprimirCierreX();
    }
  }

  public class ImpresoraFiscal
  {

    /* -----------------------------------------------------------------------------
    Typedef from exported Prototypes of "EpsonFiscalInterface.h"
    ----------------------------------------------------------------------------- */
    // ConfigurarVelocidad()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ConfigurarVelocidad(int velocidad);

    // ConfigurarPuerto()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ConfigurarPuerto(string puerto);

    // Conectar()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int Conectar();

    // Desconectar()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int Desconectar();

    // Consultar()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ConsultarVersionDll(StringBuilder descripcion, int descripcion_largo_maximo, ref int mayor, ref int menor);

    // ImprimirCierreX()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ImprimirCierreX();

    // ImprimirCierreZ()
    [DllImport("EpsonFiscalInterface.dll", CharSet = CharSet.Ansi, CallingConvention = CallingConvention.StdCall)]
    public static extern int ImprimirCierreZ();

  }

}