-- MySQL dump 10.13  Distrib 5.7.23, for Win64 (x86_64)
--
-- Host: localhost    Database: escng_totem
-- ------------------------------------------------------
-- Server version	5.7.23-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `escng_totem`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `escng_totem` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `escng_totem`;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT '',
  `status_id` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Carnes','',1,'2019-02-17 13:00:11','2019-02-18 22:59:05'),(2,'Hamburguesas','hambur.png',1,'2019-02-17 13:00:25','2019-02-18 22:59:24'),(3,'Ensaladas','frias.png',1,'2019-02-17 13:00:37','2019-02-18 22:59:10'),(4,'Fritas','',1,'2019-02-17 13:00:48','2019-02-18 22:59:16'),(5,'Bebidas','carnes.png',1,'2019-02-17 13:01:00','2019-02-18 22:58:59'),(6,'Kids','',1,'2019-02-17 13:01:10','2019-02-20 18:27:31');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `updates` tinyint(4) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES (1,1,'2018-10-24 00:00:00','2018-11-04 21:49:35');
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `percent` decimal(10,2) DEFAULT '0.00',
  `status_id` int(11) DEFAULT '2',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `totem_id` int(11) DEFAULT '0',
  `order_number` varchar(255) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT '0.00',
  `discount` decimal(10,2) DEFAULT '0.00',
  `net_price` decimal(10,2) DEFAULT '0.00',
  `payment_method` int(11) DEFAULT '1',
  `status_id` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_order_number` (`order_number`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,1,'00001',365.00,0.00,365.00,2,1,'2019-02-20 20:32:29','2019-02-20 20:32:56'),(2,1,'00002',215.00,0.00,215.00,1,0,'2019-02-20 23:19:35','2019-02-20 23:19:36'),(3,1,'00003',1085.00,0.00,1085.00,1,0,'2019-02-20 23:25:32','2019-02-20 23:25:33'),(4,0,'00004',0.00,0.00,0.00,1,0,'2019-02-20 23:37:29','2019-02-20 23:37:29');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `kitchen_text` varchar(255) DEFAULT NULL,
  `ticket_text` varchar(255) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT '0.00',
  `total_price` decimal(10,2) DEFAULT '0.00',
  `discount` decimal(10,2) DEFAULT '0.00',
  `net_price` decimal(10,2) DEFAULT '0.00',
  `status_id` int(11) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,2,1,'CLASSIC LT',1,'CLASSIC LT','COMBO CLASSIC L/T C/AGUA SIN GAS',215.00,215.00,0.00,215.00,0,'2019-02-20 23:19:35','2019-02-20 23:19:35'),(2,3,1,'CLASSIC LT',4,'CLASSIC LT','COMBO CLASSIC L/T C/LATA IMPERIAL NEGRA',215.00,860.00,0.00,860.00,0,'2019-02-20 23:25:32','2019-02-20 23:25:32'),(3,3,2,'BROOKLYN',1,'BROOKLYN','COMBO BROOKLYN C/LATA HEINEKEN',225.00,225.00,0.00,225.00,0,'2019-02-20 23:25:32','2019-02-20 23:25:32'),(4,4,1,'CLASSIC LT',4,'CLASSIC LT','COMBO CLASSIC L/T C/ADIC. AGUA SABORIZADA',215.00,860.00,0.00,860.00,0,'2019-02-20 23:37:30','2019-02-20 23:37:30'),(5,4,6,'POLLO CRUNCHY',1,'POLLO CRUNCHY','COMBO POLLO CRUNCH C/ADIC. AGUA SABORIZADA',220.00,220.00,0.00,220.00,0,'2019-02-20 23:37:30','2019-02-20 23:37:30'),(6,4,1,'CLASSIC LT',NULL,'CLASSIC LT','COMBO CLASSIC L/T C/ADIC. AGUA SABORIZADA',215.00,0.00,0.00,0.00,0,'2019-02-20 23:37:30','2019-02-20 23:37:30'),(7,4,1,'CLASSIC LT',NULL,'CLASSIC LT','COMBO CLASSIC L/T C/LATA IMPERIAL NEGRA',215.00,0.00,0.00,0.00,0,'2019-02-20 23:37:30','2019-02-20 23:37:30'),(8,4,1,'CLASSIC LT',NULL,'CLASSIC LT','COMBO CLASSIC L/T C/ADIC. AGUA SABORIZADA',215.00,0.00,0.00,0.00,0,'2019-02-20 23:37:30','2019-02-20 23:37:30'),(9,4,2,'BROOKLYN',1,'BROOKLYN','COMBO BROOKLYN C/LATA HEINEKEN',225.00,225.00,0.00,225.00,0,'2019-02-20 23:37:30','2019-02-20 23:37:30'),(10,4,3,'BESTIA',1,'BESTIA','COMBO BROOKLYN C/COCA COLA CHICA',215.00,215.00,0.00,215.00,0,'2019-02-20 23:37:30','2019-02-20 23:37:30');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `kitchen_text` varchar(255) DEFAULT '',
  `ticket_text` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` decimal(10,2) DEFAULT '0.00',
  `image` varchar(255) DEFAULT '',
  `status_id` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'02-001','CLASSIC LT','Cheddar, lechuga y tomate','CLASSIC LT','COMBO CLASSIC L/T C/{GASEOSA}',2,215.00,'1. CLASSIC LT.JPG',1,'2019-02-18 23:05:01','2019-02-18 23:07:12'),(2,'02-002','BROOKLYN','Panceta, cheddar, cebolla, pepinillos y barbacoa','BROOKLYN','COMBO BROOKLYN C/{GASEOSA}',2,225.00,'2. BROOKLYN.JPG',1,'2019-02-18 23:06:08','2019-02-18 23:06:08'),(3,'02-003','BESTIA','Panceta, cheddar, cebolla, pepinillos y barbacoa','BESTIA','COMBO BROOKLYN C/{GASEOSA}',2,215.00,'2. BROOKLYN.JPG',1,'2019-02-18 23:06:57','2019-02-18 23:06:57'),(4,'02-004','JOTAQU','Doble carne, jamón, queso, lechuga y tomate. Aderezo Mostanesa','JOTAQU','COMBO JOTAQU C/{GASEOSA}',2,230.00,'4.JOTAQU.JPG',1,'2019-02-18 23:08:08','2019-02-18 23:08:08'),(5,'02-005','GOLDEN CHICKEN','Queso, tomate, cebolla morada y crema de palta','GOLDEN CHICKEN','COMBO GOLDEN CHICKEN C/{GASEOSA}',2,195.00,'5. GOLDEN CHICKEN.JPG',1,'2019-02-18 23:09:14','2019-02-18 23:09:14'),(6,'02-006','POLLO CRUNCHY','Muzza con albahaca, jamón y tomate','POLLO CRUNCHY','COMBO POLLO CRUNCH C/{GASEOSA}',2,220.00,'6. POLLO CRUNCHY.JPG',1,'2019-02-18 23:10:28','2019-02-18 23:10:28'),(7,'02-007','LOMO CLASSIC','Queso, lechuga y tomate','LOMO CLASSIC','COMBO LOMO CLASSIC C/{GASEOSA}',2,220.00,'7. LOMO CLASICO.JPG',1,'2019-02-20 18:10:30','2019-02-20 18:10:55'),(8,'02-008','LOMO MATADOR','Panceta, cheddar, cebolla morada, lechuga y tomate. Aderezo Mostanesa','LOMO MATADOR','COMBO MATADOR C/{GASEOSA}',2,255.00,'8. LOMO EL MATADOR.JPG',1,'2019-02-20 18:12:08','2019-02-20 18:12:08'),(9,'02-009','CHAMPION','Champignones, queso, cebolla caramelizada y rúcula. Aderezo Mostadulce','CHAMPION','COMBO CHAMPION C/{GASEOSA}',2,230.00,'9.CHAMPION.JPG',1,'2019-02-20 18:13:33','2019-02-20 18:13:33'),(10,'02-010','GLUTEN FREE','Lechuga y tomate','GLUTEN FREE','COMBO GLUTEN FREE C/{GASEOSA}',2,180.00,'10. glutten free.jpg',1,'2019-02-20 18:14:44','2019-02-20 18:14:44'),(11,'02-011','POPEYE','Hamburguesa de espinaca, queso parmesano, tomates y rúcula. Aderezo Light','HAMB. DE ESPINACA','COMBO HAMB. ESPINACA C/{GASEOSA}',2,125.00,'11. POPEYE.JPG',1,'2019-02-20 18:16:00','2019-02-20 18:16:00'),(12,'02-012','BONDIOLAZA','Queso, lechuga y tomate.','BONDIOLAZA','COMBO BONDIOLAZA  C/{GASEOSA}',2,225.00,'12. BONDIOLAZA.JPG',1,'2019-02-20 18:17:08','2019-02-20 18:17:08'),(13,'06-013','HAMB. JUNIOR C/QUESO','Sale con cheddar!','HAMB. C/QUESO','HAMB. C/QUESO',6,65.00,'',1,'2019-02-20 18:24:20','2019-02-20 18:24:20'),(14,'06-014','HAMB. JUNIOR SOLA','Hamburguesa junior en pan con sésamo','HAMB. SOLA','HAMB. SOLA',6,55.00,'',1,'2019-02-20 18:26:49','2019-02-20 18:26:49'),(15,'06-015','JUNIOR POLLO','Medallón junior de pollo frito en pan con sésamo','JUNIOR POLLO','JUNIOR POLLO',6,65.00,'',1,'2019-02-20 18:28:10','2019-02-20 18:28:10'),(16,'06-016','JUNIOR L/T','Sale con lechuga y tomate!','JUNIOR L/T','JUNIOR L/T',6,65.00,'',1,'2019-02-20 18:28:53','2019-02-20 18:28:53'),(17,'06-017','HAMB. SUPER BAHIENSE','Doble carne junior, queso y huevo','HAMB. SUPER BAHIENSE','HAMB. SUPER BAHIENSE',6,140.00,'',1,'2019-02-20 18:29:43','2019-02-20 18:29:43'),(18,'04-018','CHICKENS X 6','Patitas de pollo','CHIKENS X 6','CHIKENS X 6',4,85.00,'19. nuggets pollo.png',1,'2019-02-20 18:31:45','2019-02-20 18:31:45'),(19,'04-019','PAPAS GUAPAS','con panceta y cheddar!','','PAPAS GUAPAS',4,105.00,'20. PAPAS GUAPAS.png',1,'2019-02-20 18:33:47','2019-02-20 18:33:47'),(20,'04-020','PAPAS RANCH','con salsa ranch!','','PAPAS RANCH',4,110.00,'',1,'2019-02-20 18:34:27','2019-02-20 18:34:27'),(21,'04-021','PAPAS CRINKLE','Onduladas!','','PAPAS CRINKLE',4,58.00,'',1,'2019-02-20 18:35:11','2019-02-20 18:35:11'),(22,'04-022','PAPAS  CHICAS','Crujientes y deliciosas!','','PAPAS  CHICAS',4,40.00,'',1,'2019-02-20 18:35:52','2019-02-20 18:35:52'),(23,'04-023','PAPAS  MEDIANAS','Crujientes y deliciosas!','','PAPAS  MEDIANAS',4,50.00,'',1,'2019-02-20 18:36:49','2019-02-20 18:36:49'),(24,'04-024','PAPAS  GRANDES','Crujientes y deliciosas!','','PAPAS  GRANDES',4,58.00,'',1,'2019-02-20 18:37:20','2019-02-20 18:37:20'),(25,'04-025','PAPAS SMILE','Papas sonrisa!','PAPAS SMILE ','PAPAS SMILE ',4,33.00,'',1,'2019-02-20 18:38:11','2019-02-20 18:38:11'),(26,'04-026','PAPAS GLUTEN FREE','Papas fritas sin TACC','','PAPAS SIN TACC',4,50.00,'',1,'2019-02-20 18:38:57','2019-02-20 18:38:57'),(27,'02-027','MINI BOX 1','Hamburguesa con queso','HAMB. C/QUESO','MINI BOX HAMB. C/QUESO C/{GASEOSA}',2,180.00,'28.MINI BOX 1.png',1,'2019-02-20 18:40:11','2019-02-20 18:40:11'),(28,'04-028','MINI BOX 2','Patitas de pollo','CHIKENS X 4','MINI BOX CHIKENS C/ {GASEOSA} CHICA',4,175.00,'29.MINI BOX 2.png',1,'2019-02-20 18:41:50','2019-02-20 18:41:50'),(29,'02-029','MINI BOX 3','Tostado de jamón y queso con papas smile','JUNIOR TOST + SMILE','MINI BOX J/Q-SMILE',2,155.00,'30.MINI BOX 3.png',1,'2019-02-20 18:42:59','2019-02-20 18:42:59'),(30,'02-030','PROMO KANSAS','Panceta, cheddar y barbacoa','KANSAS','PROMO KANSAS C/{GASEOSA}',2,160.00,'32. KANSAS (PROMO).JPG',1,'2019-02-20 18:44:35','2019-02-20 18:44:35'),(31,'02-031','BAHIENSE L/T','Hamburguesa junior con lechuga y tomate','JUNIOR L/T','BAHIENSE L/T C/{GASEOSA}',2,100.00,'33. BAHIENSE LT DE CARNE.jpg',1,'2019-02-20 18:45:40','2019-02-20 18:45:40'),(32,'02-032','BAHIENSE L/T POLLO','Medallón de pollo junior con lechuga y tomate','MILA POLLO CHICA','BAHIENSE L/T POLLO C/{GASEOSA}',2,100.00,'34. BAHIENSE LT DE POLLO.jpg',1,'2019-02-20 18:46:49','2019-02-20 18:46:49'),(33,'02-033',' TWINS','Brooklyn junior + Classic LT junior','JUNIOR BROOKLYN + JUNIOR CLASSIC L/T','COMBO TWINS C/{GASEOSA}',2,270.00,'',1,'2019-02-20 18:47:48','2019-02-20 18:47:48'),(34,'03-034','ENSALADA VERDE','Verdes, queso, cherries, zanahoria,zuchini, nueces y aceitunas','','ENSALADA VERDE',3,140.00,'36. ENSALADA verde.png',1,'2019-02-20 18:48:47','2019-02-20 18:48:47'),(35,'03-035','ENSALADA NIPONA','Salmón, verdes, cherries, nueces, palta, queso parmesano y cebolla morada','','ENSALADA NIPONA',3,195.00,'37. ENSALADA nipona.png',1,'2019-02-20 18:50:05','2019-02-20 18:50:05'),(36,'03-036','ENSALADA CAESAR','Lechuga, tomate, cubos de pechuga, queso parmesano, croutones y salsa caesar.','','ENSALADA CAESAR ',3,150.00,'39. ENSALADA cesar.png',1,'2019-02-20 18:51:04','2019-02-20 18:51:04'),(37,'03-037','ENSALADA TUTTI','Arroz, cherries, queso, jamón cocido, cubos de pechuga y choclo.','','ENSALADA TUTTI',3,150.00,'40. ENSALADA tutti.png',1,'2019-02-20 18:51:46','2019-02-20 18:51:46'),(38,'05-038','AGUA SABORIZADA','AGUA SABORIZADA','','AGUA SABORIZADA',5,45.00,'186AD.jpg',1,'2019-02-20 18:54:15','2019-02-20 18:54:15'),(39,'05-039','AGUA SIN GAS','AGUA SIN GAS','','AGUA SIN GAS',5,40.00,'186AD.jpg',1,'2019-02-20 18:54:34','2019-02-20 18:54:34'),(40,'05-040','ADIC. AGUA SABORIZADA','ADIC. AGUA SABORIZADA','','ADIC. AGUA SABORIZADA',5,13.00,'186AD.jpg',1,'2019-02-20 18:54:49','2019-02-20 18:54:49'),(41,'05-041','LATA IMPERIAL NEGRA','LATA IMPERIAL NEGRA','','LATA IMPERIAL NEGRA',5,80.00,'186AD.jpg',1,'2019-02-20 18:55:08','2019-02-20 18:55:08'),(42,'05-042','LATA IMPERIAL RUBIA ','LATA IMPERIAL RUBIA ','','LATA IMPERIAL RUBIA ',5,75.00,'186AD.jpg',1,'2019-02-20 18:55:26','2019-02-20 18:55:26'),(43,'05-043','LATA HEINEKEN','LATA HEINEKEN','','LATA HEINEKEN',5,80.00,'186AD.jpg',1,'2019-02-20 18:55:43','2019-02-20 18:55:43'),(44,'05-044','JUGO CEPITA','JUGO CEPITA','','JUGO CEPITA',5,28.00,'186AD.jpg',1,'2019-02-20 18:55:58','2019-02-20 18:55:58'),(45,'05-045','COCA COLA GRANDE','COCA COLA GRANDE','','COCA COLA GRANDE',5,55.00,'186AD.jpg',1,'2019-02-20 18:56:19','2019-02-20 18:56:19'),(46,'05-046','COCA COLA CHICA','COCA COLA CHICA','','COCA COLA CHICA',5,40.00,'186AD.jpg',1,'2019-02-20 18:56:35','2019-02-20 18:56:35'),(47,'05-047','COCA COLA MEDIANA','COCA COLA MEDIANA','','COCA COLA MEDIANA',5,50.00,'186AD.jpg',1,'2019-02-20 18:56:50','2019-02-20 18:56:50'),(48,'05-048','FANTA NARANJA CHICA','FANTA NARANJA CHICA','','FANTA NARANJA CHICA',5,40.00,'186AD.jpg',1,'2019-02-20 18:57:06','2019-02-20 18:57:06'),(49,'05-049','FANTA NARANJA MEDIANA','FANTA NARANJA MEDIANA','','FANTA NARANJA MEDIANA',5,50.00,'186AD.jpg',1,'2019-02-20 18:57:23','2019-02-20 18:57:23'),(50,'05-050','FANTA NARANJA GRANDE','FANTA NARANJA GRANDE','','FANTA NARANJA GRANDE',5,55.00,'186AD.jpg',1,'2019-02-20 18:57:40','2019-02-20 18:57:40'),(51,'05-051','SPRITE CHICA','SPRITE CHICA','','SPRITE CHICA',5,40.00,'186AD.jpg',1,'2019-02-20 18:57:54','2019-02-20 18:57:54'),(52,'05-052','SPRITE GRANDE','SPRITE GRANDE','','SPRITE GRANDE',5,55.00,'186AD.jpg',1,'2019-02-20 18:58:09','2019-02-20 18:58:09'),(53,'05-053','SPRITE MEDIANA','SPRITE MEDIANA','','SPRITE MEDIANA',5,50.00,'186AD.jpg',1,'2019-02-20 18:58:33','2019-02-20 18:58:33'),(54,'05-054','COCA ZERO CHICA','COCA ZERO CHICA','','COCA ZERO CHICA',5,40.00,'186AD.jpg',1,'2019-02-20 18:58:49','2019-02-20 18:58:49'),(55,'05-055','COCA ZERO MEDIANA','COCA ZERO MEDIANA','','COCA ZERO MEDIANA',5,50.00,'186AD.jpg',1,'2019-02-20 18:59:04','2019-02-20 18:59:04'),(56,'05-056','COCA ZERO GRANDE','COCA ZERO GRANDE','','COCA ZERO GRANDE',5,55.00,'186AD.jpg',1,'2019-02-20 18:59:21','2019-02-20 18:59:21'),(57,'05-057','AGUA CON GAS','AGUA CON GAS','','AGUA CON GAS',5,40.00,'186AD.jpg',1,'2019-02-20 18:59:38','2019-02-20 18:59:38'),(58,'05-058','FANTA NARANJA GRANDE','FANTA NARANJA GRANDE','','FANTA NARANJA GRANDE',5,55.00,'186AD.jpg',1,'2019-02-20 18:59:55','2019-02-20 18:59:55'),(59,'05-059','FANTA NARANJA CHICA','FANTA NARANJA CHICA','','FANTA NARANJA CHICA',5,40.00,'186AD.jpg',1,'2019-02-20 19:00:12','2019-02-20 19:00:12'),(60,'05-060','FANTA NARANJA MEDIANA','FANTA NARANJA MEDIANA','','FANTA NARANJA MEDIANA',5,50.00,'186AD.jpg',1,'2019-02-20 19:00:28','2019-02-20 19:00:28'),(61,'05-061','JUGO ADES','JUGO ADES','','JUGO ADES',5,28.00,'186AD.jpg',1,'2019-02-20 19:00:43','2019-02-20 19:00:43'),(62,'02-062','q+','Doble carne junior, queso y huevo','SUPER BAHIENSE','SUPER BAHIENSE C/{GASEOSA}',2,195.00,'',1,'2019-02-20 19:03:55','2019-02-20 19:03:55');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_discount`
--

DROP TABLE IF EXISTS `product_discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_discount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `discount_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_discount`
--

LOCK TABLES `product_discount` WRITE;
/*!40000 ALTER TABLE `product_discount` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `status_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Activo','2017-10-03 20:55:57','2017-10-03 20:55:57'),(2,'Inactivo','2017-10-03 20:56:01','2017-10-03 20:56:01');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT '',
  `status_id` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'omar','master1*','Omar Melendrez','tesdddt',1,'2017-10-03 20:55:40','2017-10-04 20:40:08');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-21 11:30:22
