const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
})

async function test() {
  try {
    console.log('🔍 Probando conexión de Prisma...\n')
    
    // Test 1: Verificar que userAccount existe
    if (!prisma.userAccount) {
      console.log('❌ prisma.userAccount no está disponible')
      return
    }
    console.log('✅ prisma.userAccount está disponible')
    
    // Test 2: Intentar contar usuarios
    const count = await prisma.userAccount.count()
    console.log(`✅ Conexión exitosa. Usuarios en la base de datos: ${count}`)
    
    // Test 3: Verificar estructura de la tabla
    const result = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'user_accounts'
      ORDER BY ordinal_position;
    `
    console.log('\n📋 Estructura de la tabla:')
    result.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type}`)
    })
    
    console.log('\n✅ Prisma puede acceder a la tabla correctamente')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.code) {
      console.error('   Código:', error.code)
    }
  } finally {
    await prisma.$disconnect()
  }
}

test()


