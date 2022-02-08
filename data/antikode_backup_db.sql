/*
 Navicat Premium Data Transfer

 Source Server         : Local MySQL
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : antikode

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 08/02/2022 20:58:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for brands
-- ----------------------------
DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `logo` text,
  `banner` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of brands
-- ----------------------------
BEGIN;
INSERT INTO `brands` VALUES (1, 'Nike', 'https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg', 'https://www.snkrempire.com/wp-content/uploads/2020/03/NIKE_BANNER.png', '2022-02-08 18:29:32', '2022-02-08 20:20:54');
COMMIT;

-- ----------------------------
-- Table structure for outlets
-- ----------------------------
DROP TABLE IF EXISTS `outlets`;
CREATE TABLE `outlets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `picture` text,
  `address` text,
  `longitude` varchar(500) DEFAULT NULL,
  `latitude` varchar(500) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of outlets
-- ----------------------------
BEGIN;
INSERT INTO `outlets` VALUES (1, 1, 'Nike Timing', 'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=BUV2CSJ23nrNPimnAvn0rA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=180.07779&pitch=0&thumbfov=100', 'Jl. M.H. Thamrin No.11, RT.8/RW.4, Gondangdia, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10350', '106.82374908722015', '-6.186904916746396', '2022-02-08 19:02:01', '2022-02-08 19:02:15');
INSERT INTO `outlets` VALUES (3, 1, 'Nike Kota Kasablanka', 'https://lh5.googleusercontent.com/p/AF1QipPbmM8-Bk0Wa8DHXc2TltNJaE9itbtNeIAt6VVx=w408-h544-k-no', 'Kota Kasablanka Lantai 1, Jl. Raya Casablanca No.88, RT.14/RW.5, Menteng Dalam, Kec. Tebet, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12870', '106.84352611276525', '-6.222026346589868', '2022-02-08 20:03:26', '2022-02-08 20:03:26');
COMMIT;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand_id` int DEFAULT NULL,
  `outlet_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `picture` text,
  `price` decimal(10,0) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of products
-- ----------------------------
BEGIN;
INSERT INTO `products` VALUES (1, 1, 1, 'Nike Jordan', 'Nike Jordan Logo', 10000, '2022-02-08 18:43:10', '2022-02-08 20:50:04');
INSERT INTO `products` VALUES (3, 1, 3, 'Nike Jordan', 'Nike Logo', 10010, '2022-02-08 20:48:54', '2022-02-08 20:48:54');
INSERT INTO `products` VALUES (4, 1, 1, 'Nike Air Max', 'Nike Air Max Logo', 11000, '2022-02-08 20:49:40', '2022-02-08 20:49:40');
COMMIT;

-- ----------------------------
-- Table structure for SequelizeMeta
-- ----------------------------
DROP TABLE IF EXISTS `SequelizeMeta`;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of SequelizeMeta
-- ----------------------------
BEGIN;
INSERT INTO `SequelizeMeta` VALUES ('20220207075438-create-brands.js');
INSERT INTO `SequelizeMeta` VALUES ('20220208111559-create-outlets.js');
INSERT INTO `SequelizeMeta` VALUES ('20220208111724-create-products.js');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
