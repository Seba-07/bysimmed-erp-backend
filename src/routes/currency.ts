import express from 'express'

const router = express.Router()

// GET current USD to CLP exchange rate
router.get('/usd-clp', async (req, res) => {
  try {
    // Using mindicador.cl API - Chilean Central Bank official rates
    const response = await fetch('https://mindicador.cl/api/dolar')

    if (!response.ok) {
      throw new Error('Error fetching exchange rate')
    }

    const data = await response.json()
    const rate = data.serie[0].valor // Most recent value

    res.json({
      rate,
      date: data.serie[0].fecha,
      source: 'mindicador.cl'
    })
  } catch (error) {
    console.error('Error fetching USD-CLP rate:', error)
    res.status(500).json({
      message: 'Error al obtener tasa de cambio',
      error,
      // Fallback rate in case of error
      rate: 900,
      fallback: true
    })
  }
})

export default router
