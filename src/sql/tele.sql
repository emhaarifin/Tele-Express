CREATE DATABASE  IF NOT EXISTS `arifin_tele` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `arifin_tele`;
-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: fwebdev.xyz    Database: arifin_tele
-- ------------------------------------------------------
-- Server version	5.5.62-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiver_id` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message_body` varchar(1280) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=240 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'6b26f4cb-0f83-4096-b371-c79b4408b858','2cf8dc6f-6dc5-44f7-a899-9c6fe69acf18','','2021-09-01 00:28:54'),(2,'6b26f4cb-0f83-4096-b371-c79b4408b858','2cf8dc6f-6dc5-44f7-a899-9c6fe69acf18','','2021-09-01 00:29:09'),(3,'6b26f4cb-0f83-4096-b371-c79b4408b858','2cf8dc6f-6dc5-44f7-a899-9c6fe69acf18','','2021-09-01 00:33:11'),(4,'6b26f4cb-0f83-4096-b371-c79b4408b858','2cf8dc6f-6dc5-44f7-a899-9c6fe69acf18','','2021-09-01 00:33:13'),(89,'2cf8dc6f-6dc5-44f7-a899-9c6fe69acf18','6b26f4cb-0f83-4096-b371-c79b4408b858','e','2021-09-01 04:39:25'),(213,'abef7421-3058-4b7f-aea7-7f73ef788106','2cf8dc6f-6dc5-44f7-a899-9c6fe69acf18','asd','2021-09-19 14:12:41'),(214,'abef7421-3058-4b7f-aea7-7f73ef788106','2cf8dc6f-6dc5-44f7-a899-9c6fe69acf18','akaka','2021-09-19 14:12:43'),(215,'abef7421-3058-4b7f-aea7-7f73ef788106','2cf8dc6f-6dc5-44f7-a899-9c6fe69acf18','halo','2021-09-19 14:18:56'),(216,'2cf8dc6f-6dc5-44f7-a899-9c6fe69acf18','abef7421-3058-4b7f-aea7-7f73ef788106','gmn?','2021-09-19 14:20:38'),(219,'1dcb6809-fd4e-4219-8e38-fcd680f58247','abef7421-3058-4b7f-aea7-7f73ef788106','Halo, mas','2021-09-20 10:31:01'),(220,'1dcb6809-fd4e-4219-8e38-fcd680f58247','abef7421-3058-4b7f-aea7-7f73ef788106','lagi dimana?','2021-09-20 10:31:06'),(221,'abef7421-3058-4b7f-aea7-7f73ef788106','1dcb6809-fd4e-4219-8e38-fcd680f58247','lagi di warung ','2021-09-20 10:32:48'),(222,'abef7421-3058-4b7f-aea7-7f73ef788106','1dcb6809-fd4e-4219-8e38-fcd680f58247','nap?','2021-09-20 10:32:55'),(223,'abef7421-3058-4b7f-aea7-7f73ef788106','1dcb6809-fd4e-4219-8e38-fcd680f58247','*napa','2021-09-20 10:33:00'),(224,'1dcb6809-fd4e-4219-8e38-fcd680f58247','abef7421-3058-4b7f-aea7-7f73ef788106','nitip jajan','2021-09-20 10:33:11'),(225,'abef7421-3058-4b7f-aea7-7f73ef788106','1dcb6809-fd4e-4219-8e38-fcd680f58247','jajan apa?','2021-09-20 10:33:24'),(226,'1dcb6809-fd4e-4219-8e38-fcd680f58247','abef7421-3058-4b7f-aea7-7f73ef788106','putu ayu','2021-09-20 10:34:24'),(227,'abef7421-3058-4b7f-aea7-7f73ef788106','1dcb6809-fd4e-4219-8e38-fcd680f58247','yoi','2021-09-20 10:34:36'),(235,'1dcb6809-fd4e-4219-8e38-fcd680f58247','6b26f4cb-0f83-4096-b371-c79b4408b858','x','2021-09-22 07:06:24'),(239,'1dcb6809-fd4e-4219-8e38-fcd680f58247','2cf8dc6f-6dc5-44f7-a899-9c6fe69acf18','a','2021-09-22 07:13:40');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullname` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'https://res.cloudinary.com/emhaarifin/image/upload/v1632113374/Tele%20App/user-default_khw9y4.png',
  `bio` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `roles` enum('admin','member') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'member',
  `status` enum('inactive','active') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'inactive',
  `socket_id` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1dcb6809-fd4e-4219-8e38-fcd680f58247','101muhammadarifin@gmail.com','$2a$10$YbLvKXbjvXCOqdHlUbIstOWcmJOozR6viKWo4eXeLWqPHRVBCPxKa','Muhammad Arifin','Arifin','081917682610','https://res.cloudinary.com/emhaarifin/image/upload/v1632108760/Tele%20App/MVIMG_20210828_101543_4_yu76h9.jpg','Aku salah sangka pada diriku,','admin','active','GvIruGjDokiV2crOAAAD'),('2cf8dc6f-6dc5-44f7-a899-9c6fe69acf18','emhaarifin02@gmail.com','$2a$10$wMkQiqsWwUGzoDoxf8lfw.UKcs4GOWv1kONkEGhKDdI4RP8XR94RO','Dimas Ari Saputra','Dimas','08823549849','https://res.cloudinary.com/emhaarifin/image/upload/v1632107991/Tele%20App/pp_3_lvf7ug.jpg','Bismillah sukses','member','active',''),('6b26f4cb-0f83-4096-b371-c79b4408b858','kawulaarifin@gmail.com','$2a$10$wuPTcgJv8EtvLndgzg0EYeQpGb3cQ1lEjZcaAz5rxpmPGwM0vwYWK','Ridho Maulana','Ridho','08121787356','https://res.cloudinary.com/emhaarifin/image/upload/v1632108226/Tele%20App/pp_2_vpmkic.jpg','Panggil Aku Pyeha, manse manse manmanse','member','active','bU_aHk5YUwGNzk_2AAAP'),('abef7421-3058-4b7f-aea7-7f73ef788106','armisja.404@gmail.com','$2a$10$WPllx6MGSAwJTo5e55KCPuvc0lICn/G85eMBzPVvnE92jKpyt0OHC','Alan Nugraha','Alan','08581666358','https://res.cloudinary.com/emhaarifin/image/upload/v1632108227/Tele%20App/pp_uo6vsy.jpg','Hubungi jika penting','admin','active','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-23 11:16:17
