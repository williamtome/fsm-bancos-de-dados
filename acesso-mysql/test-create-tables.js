const mysql = require('mysql2/promise')

const test = async() => {

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'catalog_products'
  })

  try {
    const [results] = await connection.query(`SHOW TABLES LIKE 'categories'`)

    if (results.length === 0) {
      
      await connection.query(`
        CREATE TABLE categories (
          id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
          category VARCHAR(250) NULL DEFAULT NULL
        );
      `)
  
      await connection.query(`
        CREATE TABLE products (
          id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
          product VARCHAR(250) NULL,
          price DECIMAL(5.2) NULL
        );
      `)
      
      await connection.query(`
        CREATE TABLE images (
          id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
          description TEXT NULL,
          url VARCHAR(500) NULL,
          product_id INT NOT NULL,
          KEY fk_images_products_idx (product_id),
          CONSTRAINT fk_images_products_constraint FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
        );
      `)
  
      await connection.query(`
        CREATE TABLE categories_products (
          category_id INT NOT NULL,
          product_id INT NOT NULL,
          KEY fk_categories_products_idx (category_id, product_id),
          CONSTRAINT fk_categories_products_constraint_1 FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT fk_categories_products_constraint_2 FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
        );
      `)
      
    }
  } catch (err) {
    console.error('ERRO AO CRIAR TABELA: ', err)
  }

}

test()