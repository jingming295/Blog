-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2024-01-13 18:31:38
-- 服务器版本： 10.4.21-MariaDB
-- PHP 版本： 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `blog`
--

-- --------------------------------------------------------

--
-- 表的结构 `tb_article`
--

CREATE TABLE `tb_article` (
  `article_id` int(11) NOT NULL,
  `article_title` varchar(100) NOT NULL,
  `article_content` longtext NOT NULL,
  `article_createTime` datetime NOT NULL DEFAULT current_timestamp(),
  `article_lastEditTime` datetime NOT NULL DEFAULT current_timestamp(),
  `article_author` int(11) NOT NULL,
  `article_area` int(11) NOT NULL,
  `article_tag` mediumtext NOT NULL,
  `article_alive` smallint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `tb_article`
--

INSERT INTO `tb_article` (`article_id`, `article_title`, `article_content`, `article_createTime`, `article_lastEditTime`, `article_author`, `article_area`, `article_tag`, `article_alive`) VALUES
(11, 'C++ Introduction', '<h2 style=\"text-align: start;\">What is C++?</h2><p><br></p><p>C++ is a general-purpose programming language that was developed as an enhancement of the C language to include object-oriented paradigm. It is an imperative and a compiled language. </p><p>C++ is a high-level, general-purpose programming language designed for system and application programming. It was developed by Bjarne Stroustrup at Bell Labs in 1983 as an extension of the C programming language. C++ is an object-oriented, multi-paradigm language that supports procedural, functional, and generic programming styles.</p><p>One of the key features of C++ is its ability to support low-level, system-level programming, making it suitable for developing operating systems, device drivers, and other system software. At the same time, C++ also provides a rich set of libraries and features for high-level application programming, making it a popular choice for developing desktop applications, video games, and other complex applications.</p><p>C++ has a large, active community of developers and users, and a wealth of resources and tools available for learning and using the language. Some of the key features of C++ include:</p><p>Object-Oriented Programming: C++ supports object-oriented programming, allowing developers to create classes and objects and to define methods and properties for these objects.</p><p>Templates: C++ templates allow developers to write generic code that can work with any data type, making it easier to write reusable and flexible code.</p><p>Standard Template Library (STL): The STL provides a wide range of containers and algorithms for working with data, making it easier to write efficient and effective code.</p><p>Exception Handling: C++ provides robust exception handling capabilities, making it easier to write code that can handle errors and unexpected situations.</p><p><br></p><p><br></p><p><br></p>', '2024-01-03 00:00:00', '2024-01-03 01:39:29', 26, 2, 'blog', 1),
(12, 'Anime', '<p>Anime (Japanese: アニメ, IPA: [aꜜɲime] ⓘ) is hand-drawn and computer-generated animation originating from Japan. Outside Japan and in English, anime refers specifically to animation produced in Japan.[1] However, in Japan and in Japanese, anime (a term derived from a shortening of the English word animation) describes all animated works, regardless of style or origin. Many works of animation with a similar style to Japanese animation are also produced outside Japan. Video games sometimes also feature themes and artstyles that can be considered as \"anime\".</p><p><br></p><p>The earliest commercial Japanese animation dates to 1917. A characteristic art style emerged in the 1960s with the works of cartoonist Osamu Tezuka and spread in following decades, developing a large domestic audience. Anime is distributed theatrically, through television broadcasts, directly to home media, and over the Internet. In addition to original works, anime are often adaptations of Japanese comics (manga), light novels, or video games. It is classified into numerous genres targeting various broad and niche audiences.[2]</p><p><br></p><p>Anime is a diverse medium with distinctive production methods that have adapted in response to emergent technologies. It combines graphic art, characterization, cinematography, and other forms of imaginative and individualistic techniques.[3] Compared to Western animation, anime production generally focuses less on movement, and more on the detail of settings and use of \"camera effects\", such as panning, zooming, and angle shots.[3] Diverse art styles are used, and character proportions and features can be quite varied, with a common characteristic feature being large and emotive eyes.[4]</p><p><br></p><p>The anime industry consists of over 430 production companies, including major studios such as Studio Ghibli, Kyoto Animation, Sunrise, Bones, Ufotable, MAPPA, Wit Studio, CoMix Wave Films, Production I.G, and Toei Animation. Since the 1980s, the medium has also seen widespread international success with the rise of foreign dubbed, subtitled programming, and since the 2010s its increasing distribution through streaming services and a widening demographic embrace of anime culture, both within Japan and worldwide.[5] As of 2016, Japanese animation accounted for 60% of the world\'s animated television shows.[6]</p><p><br></p><p>The anime industry consists of over 430 production companies, including major studios such as Studio Ghibli, Kyoto Animation, Sunrise, Bones, Ufotable, MAPPA, Wit Studio, CoMix Wave Films, Production I.G, and Toei Animation. Since the 1980s, the medium has also seen widespread international success with the rise of foreign dubbed, subtitled programming, and since the 2010s its increasing distribution through streaming services and a widening demographic embrace of anime culture, both within Japan and worldwide.[5] As of 2016, Japanese animation accounted for 60% of the world\'s animated television shows.[6]</p><p>The anime industry consists of over 430 production companies, including major studios such as Studio Ghibli, Kyoto Animation, Sunrise, Bones, Ufotable, MAPPA, Wit Studio, CoMix Wave Films, Production I.G, and Toei Animation. Since the 1980s, the medium has also seen widespread international success with the rise of foreign dubbed, subtitled programming, and since the 2010s its increasing distribution through streaming services and a widening demographic embrace of anime culture, both within Japan and worldwide.[5] As of 2016, Japanese animation accounted for 60% of the world\'s animated television shows.[6]</p><p>The anime industry consists of over 430 production companies, including major studios such as Studio Ghibli, Kyoto Animation, Sunrise, Bones, Ufotable, MAPPA, Wit Studio, CoMix Wave Films, Production I.G, and Toei Animation. Since the 1980s, the medium has also seen widespread international success with the rise of foreign dubbed, subtitled programming, and since the 2010s its increasing distribution through streaming services and a widening demographic embrace of anime culture, both within Japan and worldwide.[5] As of 2016, Japanese animation accounted for 60% of the world\'s animated television shows.[6]</p>', '2024-01-03 00:00:00', '2024-01-03 01:39:29', 26, 1, 'blog', 1),
(13, 'Test', '<p>TestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest</p>', '2024-01-03 00:00:00', '2024-01-03 01:39:29', 26, 2, 'programming', 0),
(28, 'Test', '<p>123</p>', '2024-01-03 00:00:00', '2024-01-03 01:39:29', 26, 2, 'blog', 0),
(29, 'ttttttttttttttttttttttttttttttttttttttttt', '<p>ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttv</p>', '2024-01-03 00:00:00', '2024-01-03 01:39:29', 26, 2, 'blog', 0),
(30, 'Test123', '<p>123</p>', '2024-01-03 01:38:32', '2024-01-03 01:39:29', 26, 2, 'blog', 0),
(33, '1', '<p>1</p>', '2024-01-03 13:48:52', '2024-01-03 13:48:52', 26, 2, 'blog', 0),
(34, 'The must--watch anime to look out for in winter 2024', '<h2 style=\"text-align: start; line-height: 1.15;\"><strong>DELICIOUS IN DUNGEON</strong></h2><p style=\"text-align: start;\"><strong>Release date:</strong> Jan. 4 1 5<br> </p><p style=\"text-align: start;\"><strong>Where to watch:</strong> Netflix</p><p style=\"text-align: start;\">Based on Ryōko Kui’s fantasy comedy manga, <em>Delicious in Dungeon</em> follows a group of intrepid adventurers who descend into the bowels of an ancient labyrinth in search of gold and glory. After being defeated by a powerful red dragon, the remaining party members — human swordsman Laios, halfling locksmith Chilchuck, and elven spellcaster Marcille — reconvene to venture back into the dungeon to save Laios’ sister Falin.</p><p style=\"text-align: start;\">There’s just one problem: They have no money and nothing to eat. Enter Senshi, a dwarven warrior with a knack for cooking the many monsters and creatures that live in the dungeon’s depths, who agrees to help the party rescue Falin in exchange for the chance to eat the red dragon.</p><p style=\"text-align: start;\">Directed by Yoshihiro Miyajima (<em>Little Witch Academia</em>, <em>JoJo’s Bizarre Adventure: Golden Wind</em>), <em>Delicious in Dungeon</em> is being produced by Trigger, the anime studio behind <em>Kill La Kill</em>, <em>Little Witch Academia</em>, and most recently <em>Cyberpunk: Edgerunners</em>, which earned a place on our list of the <a href=\"https://www.polygon.com/22919571/best-anime-2022\" target=\"\">best anime of 2022</a>.</p><p style=\"text-align: start;\"><br></p><h2 style=\"text-align: start; line-height: 1.15;\"><strong>SOLO LEVELING</strong></h2><p style=\"text-align: start;\"><strong>Release date:</strong> Jan. 6<br><strong>Where to watch:</strong> Crunchyroll</p><p style=\"text-align: start;\">Based on the popular South Korean web novel, <em>Solo Leveling</em> is set in a fantasy world where super-powered warriors known as hunters battle against supernatural creatures who have descended upon Earth en masse to wreak havoc and destruction. The series follows Sung Jin-woo, an infamously low-level hunter, who is inexplicably granted a mysterious power known as “The System” which allows him to amass power without any limit. After becoming the strongest hunter in the world, Jin-woo finds himself caught between two factions vying for the future of the world.</p><p style=\"text-align: start;\">A-1 Pictures (<em>Kaguya-Sama: Love is War</em>, <em>Nier: Automata Ver1.1a</em>) will be producing the anime with Shunsuke Nakashige (<em>Sword Art Online: Alicization — War of Underworld</em>) attached as director and Hiroyuki Sawano (<em>Attack on Titan</em>) as composer.</p><p><br></p><h2 style=\"text-align: start; line-height: 1.15;\"><strong>BLUE EXORCIST: SHIMANE ILLUMINATI SAGA</strong></h2><p style=\"text-align: start;\"><strong>Release date:</strong> Jan. 6<br><strong>Where to watch:</strong> TBA</p><p style=\"text-align: start;\"><em>Blue Exorcist</em> returns this year with a brand new season! Set after the events of 2011’s <em>Blue Exorcist</em> and 2017’s <em>Blue Exorcist: Kyoto Saga</em>, <em>Blue Exorcist: Shimane Illuminati Saga </em>continues the story of Rin Okumura, the estranged son of the demon lord Satan, as he grows on his journey to become a powerful exorcist.</p><p style=\"text-align: start;\">This season will adapt volumes 10-15 of Kazue Katō’s original manga and feature the returning cast of voice actors from previous seasons. Daisuke Yoshida (<em>Hajime no Ippo</em>) will direct <em>Blue Exorcist: Shimane Illuminati Saga</em>, with animation duties being handled by Studio VOLN. Hiroyuki Sawano and Kohta Yamamoto will return as composers on this new season, with Toshiya Ōno also returning as series script writer.</p><p><br></p>', '2024-01-03 13:59:48', '2024-01-08 01:10:59', 26, 1, 'blog', 1),
(35, '123', '<p>AVDDASDASDSDASD</p>', '2024-01-03 22:54:45', '2024-01-03 22:54:45', 26, 2, 'blog', 0),
(36, 'Test', '<p>Te</p>', '2024-01-03 22:55:32', '2024-01-03 22:55:32', 26, 2, 'blog', 0),
(37, '1', '<p>1</p>', '2024-01-04 04:21:04', '2024-01-04 04:21:04', 26, 2, 'blog', 0),
(38, 'TTestTestTestTestTestTestTestTestTestTestTestTe1stTestTestTestTestTestTestTestTestTestTestTestTestTA', '<p><span style=\"font-family: &quot;Times New Roman&quot;;\">A Test Article</span></p><div data-w-e-type=\"video\" data-w-e-is-void>\n<video poster=\"\" controls=\"true\" width=\"auto\" height=\"auto\"><source src=\"https://cdn.akamai.steamstatic.com/steam/apps/5952/movie_max.webm?t=1682697457\" type=\"video/mp4\"/></video>\n</div><pre><code >sdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaadddddddddddddddddddddddddddddddddddddddddddddddddddddsdaaddddd</code></pre><p><br></p>', '2024-01-07 22:43:19', '2024-01-11 05:09:52', 26, 1, 'blog', 1),
(39, 'Test 2', '<p>A Test 2 article</p>', '2024-01-07 22:43:43', '2024-01-07 22:43:43', 26, 2, 'blog', 1),
(40, 'Test 3', '<p>Test 3</p>', '2024-01-07 22:45:20', '2024-01-07 22:45:20', 26, 2, 'blog', 1),
(41, 'Learn C++', '<p>C</p>', '2024-01-11 16:51:23', '2024-01-12 08:58:38', 26, 2, 'blog', 1),
(42, 'C', '<p>C</p>', '2024-01-12 09:01:01', '2024-01-12 09:01:01', 26, 4, 'blog', 0),
(43, 'The TV', '<p>A</p>', '2024-01-12 13:58:24', '2024-01-12 13:58:24', 26, 8, 'blog', 0);

-- --------------------------------------------------------

--
-- 表的结构 `tb_avatar`
--

CREATE TABLE `tb_avatar` (
  `avatar_id` int(11) NOT NULL,
  `avatar_name` varchar(100) NOT NULL,
  `avatar_sha256` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `tb_avatar`
--

INSERT INTO `tb_avatar` (`avatar_id`, `avatar_name`, `avatar_sha256`) VALUES
(1, '1.png', 'cadcbda2c8c8b506235d7aa55628a9fe5a3037850d6a59c1a2d5c858d67bd142'),
(13, '2.png', 'cadcbda2c8c8b506235d7aa55628a9fe5a3037850d6a59c1a2d5c858d67bd142'),
(14, '1.jpg', 'bc8630f6956cd7e72c7f064334868b64d8ae8afb2d5b2b34232c7d1193c7b478'),
(15, '3.png', 'e1752f267a8b698a3c742201087e74cc233c1b78b0abfadd295037e5e0c2b019'),
(16, '1.gif', '33fae2cda6f94830652421b7254cbff97d5f6f6800eff8397adbb64436e52edf'),
(17, '2.gif', '87ffb5ff757ae037e931517c9871b09a5181f57903b1566a82b9359d40c585fa');

-- --------------------------------------------------------

--
-- 表的结构 `tb_bigarea`
--

CREATE TABLE `tb_bigarea` (
  `ba_id` int(11) NOT NULL,
  `ba_name` varchar(20) NOT NULL,
  `ba_alive` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `tb_bigarea`
--

INSERT INTO `tb_bigarea` (`ba_id`, `ba_name`, `ba_alive`) VALUES
(1, 'Learning', 1),
(2, 'Entertainment', 1),
(3, 'Fun Facts123', 1),
(4, 'Good Things', 0),
(5, '123', 0),
(6, '123', 0),
(7, '', 0),
(8, 'T', 1),
(9, 'A', 1);

-- --------------------------------------------------------

--
-- 表的结构 `tb_colorscheme`
--

CREATE TABLE `tb_colorscheme` (
  `cs_id` int(11) NOT NULL,
  `cs_textColor` varchar(20) NOT NULL,
  `cs_backgroundColor` varchar(20) NOT NULL,
  `cs_alive` smallint(6) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `tb_colorscheme`
--

INSERT INTO `tb_colorscheme` (`cs_id`, `cs_textColor`, `cs_backgroundColor`, `cs_alive`) VALUES
(1, 'white', '#e85d75', 1),
(2, 'white', '#04AA6D', 1),
(3, '#e85d75', 'white', 0),
(4, '#ffffff', '#00ccff', 1),
(5, '#ffffff', '#00ffd5', 0),
(6, '#ffffff', '#ff0000', 1),
(7, '#ffffff', '#a600ff', 1),
(8, '#ffffff', '#4dfee1', 0),
(9, '#ffffff', '#00ffd5', 0),
(10, '#ffffff', '#00ffd5', 0),
(11, '#ffffff', '#44ff00', 0),
(12, '#ffffff', '#299900', 1),
(13, '#ffffff', '#e13737', 1),
(14, '#ffffff', '#3743e1', 1),
(15, '#ffffff', '#000000', 0),
(16, '#ffffff', '#000000', 0),
(17, '#ffffff', '#000000', 0);

-- --------------------------------------------------------

--
-- 表的结构 `tb_setting_loginandregister`
--

CREATE TABLE `tb_setting_loginandregister` (
  `s_LNR_id` int(11) NOT NULL,
  `s_LNR_allowUserRegis` smallint(1) NOT NULL DEFAULT 1,
  `s_LNR_emailVerification` smallint(1) NOT NULL DEFAULT 0,
  `s_LNR_resetPassword` smallint(1) NOT NULL DEFAULT 0,
  `s_LNR_SMTP` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `tb_setting_loginandregister`
--

INSERT INTO `tb_setting_loginandregister` (`s_LNR_id`, `s_LNR_allowUserRegis`, `s_LNR_emailVerification`, `s_LNR_resetPassword`, `s_LNR_SMTP`) VALUES
(1, 1, 1, 0, 1);

-- --------------------------------------------------------

--
-- 表的结构 `tb_setting_sendemail`
--

CREATE TABLE `tb_setting_sendemail` (
  `s_SE_id` int(11) NOT NULL,
  `s_SE_senderName` varchar(100) DEFAULT NULL,
  `s_SE_senderEmail` varchar(254) DEFAULT NULL COMMENT 'RFC 5322',
  `s_SE_smtpServer` varchar(254) DEFAULT NULL,
  `s_SE_smtpPort` int(5) DEFAULT NULL,
  `s_SE_smtpUsername` varchar(254) DEFAULT NULL,
  `s_SE_smtpPassword` varchar(200) DEFAULT NULL,
  `s_SE_replyEmail` varchar(254) DEFAULT NULL,
  `s_SE_forceSSL` smallint(6) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `tb_setting_sendemail`
--

INSERT INTO `tb_setting_sendemail` (`s_SE_id`, `s_SE_senderName`, `s_SE_senderEmail`, `s_SE_smtpServer`, `s_SE_smtpPort`, `s_SE_smtpUsername`, `s_SE_smtpPassword`, `s_SE_replyEmail`, `s_SE_forceSSL`) VALUES
(1, 'ming', 'blog@ming295.com', 'smtp-relay.sendinblue.com', 587, 'jingming295@gmail.com', 'xsmtpsib-8887c6c305518a428a1380d51c0b799cdd17d4771709a9ec6cd96f17ce0fbfdd-OAVFm38LHPcnNxbR', 'jingming300@gmail.com', 1);

-- --------------------------------------------------------

--
-- 表的结构 `tb_subarea`
--

CREATE TABLE `tb_subarea` (
  `aa_id` int(11) NOT NULL,
  `aa_area` varchar(20) NOT NULL,
  `aa_colorscheme` int(11) NOT NULL DEFAULT 1,
  `bigarea` int(11) NOT NULL DEFAULT 1,
  `aa_alive` smallint(6) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `tb_subarea`
--

INSERT INTO `tb_subarea` (`aa_id`, `aa_area`, `aa_colorscheme`, `bigarea`, `aa_alive`) VALUES
(1, 'Anime', 4, 2, 1),
(2, 'Programming', 2, 1, 1),
(3, 'HTML', 1, 1, 0),
(4, 'C++', 1, 1, 0),
(5, 'Test', 14, 3, 0),
(6, 'Test2', 2, 1, 0),
(7, '', 2, 2, 0),
(8, 'TV', 14, 2, 1),
(9, 'T', 1, 1, 1),
(10, 'TV', 14, 8, 1),
(11, 'B', 13, 9, 1),
(12, 'B', 12, 9, 1);

-- --------------------------------------------------------

--
-- 表的结构 `tb_user`
--

CREATE TABLE `tb_user` (
  `u_id` int(11) NOT NULL,
  `u_name` varchar(20) NOT NULL,
  `u_email` varchar(254) NOT NULL COMMENT 'RFC 5322',
  `u_password` varchar(64) NOT NULL,
  `u_gender` smallint(1) NOT NULL DEFAULT 0,
  `u_desc` varchar(100) NOT NULL DEFAULT 'This is a user description.',
  `u_class` smallint(1) NOT NULL DEFAULT 0,
  `u_active` smallint(1) NOT NULL DEFAULT 0,
  `u_token` varchar(64) DEFAULT NULL,
  `u_avatar` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `tb_user`
--

INSERT INTO `tb_user` (`u_id`, `u_name`, `u_email`, `u_password`, `u_gender`, `u_desc`, `u_class`, `u_active`, `u_token`, `u_avatar`) VALUES
(26, 'jingming123123121321', 'jingming295@gmail.com', '173af653133d964edfc16cafe0aba33c8f500a07f3ba3f81943916910c257705', 0, 'ME.21314', 3, 1, NULL, 16),
(32, 'Jingm', 'jingming300@gmail.com', '173af653133d964edfc16cafe0aba33c8f500a07f3ba3f81943916910c257705', 0, 'This is a user description.', 0, 1, NULL, 1);

--
-- 转储表的索引
--

--
-- 表的索引 `tb_article`
--
ALTER TABLE `tb_article`
  ADD PRIMARY KEY (`article_id`),
  ADD KEY `fk_author` (`article_author`),
  ADD KEY `article_area` (`article_area`);

--
-- 表的索引 `tb_avatar`
--
ALTER TABLE `tb_avatar`
  ADD PRIMARY KEY (`avatar_id`);

--
-- 表的索引 `tb_bigarea`
--
ALTER TABLE `tb_bigarea`
  ADD PRIMARY KEY (`ba_id`);

--
-- 表的索引 `tb_colorscheme`
--
ALTER TABLE `tb_colorscheme`
  ADD PRIMARY KEY (`cs_id`);

--
-- 表的索引 `tb_setting_loginandregister`
--
ALTER TABLE `tb_setting_loginandregister`
  ADD PRIMARY KEY (`s_LNR_id`),
  ADD KEY `s_LNR_SMTP` (`s_LNR_SMTP`);

--
-- 表的索引 `tb_setting_sendemail`
--
ALTER TABLE `tb_setting_sendemail`
  ADD PRIMARY KEY (`s_SE_id`);

--
-- 表的索引 `tb_subarea`
--
ALTER TABLE `tb_subarea`
  ADD PRIMARY KEY (`aa_id`),
  ADD KEY `aa_colorscheme` (`aa_colorscheme`),
  ADD KEY `fk_subarea_bigarea` (`bigarea`);

--
-- 表的索引 `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`u_id`),
  ADD KEY `u_avatar` (`u_avatar`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `tb_article`
--
ALTER TABLE `tb_article`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- 使用表AUTO_INCREMENT `tb_avatar`
--
ALTER TABLE `tb_avatar`
  MODIFY `avatar_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 使用表AUTO_INCREMENT `tb_bigarea`
--
ALTER TABLE `tb_bigarea`
  MODIFY `ba_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- 使用表AUTO_INCREMENT `tb_colorscheme`
--
ALTER TABLE `tb_colorscheme`
  MODIFY `cs_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 使用表AUTO_INCREMENT `tb_setting_loginandregister`
--
ALTER TABLE `tb_setting_loginandregister`
  MODIFY `s_LNR_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `tb_setting_sendemail`
--
ALTER TABLE `tb_setting_sendemail`
  MODIFY `s_SE_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `tb_subarea`
--
ALTER TABLE `tb_subarea`
  MODIFY `aa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 使用表AUTO_INCREMENT `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- 限制导出的表
--

--
-- 限制表 `tb_article`
--
ALTER TABLE `tb_article`
  ADD CONSTRAINT `fk_author` FOREIGN KEY (`article_author`) REFERENCES `tb_user` (`u_id`),
  ADD CONSTRAINT `tb_article_ibfk_1` FOREIGN KEY (`article_area`) REFERENCES `tb_subarea` (`aa_id`);

--
-- 限制表 `tb_setting_loginandregister`
--
ALTER TABLE `tb_setting_loginandregister`
  ADD CONSTRAINT `tb_setting_loginandregister_ibfk_1` FOREIGN KEY (`s_LNR_SMTP`) REFERENCES `tb_setting_sendemail` (`s_SE_id`);

--
-- 限制表 `tb_subarea`
--
ALTER TABLE `tb_subarea`
  ADD CONSTRAINT `fk_subarea_bigarea` FOREIGN KEY (`bigarea`) REFERENCES `tb_bigarea` (`ba_id`),
  ADD CONSTRAINT `tb_subarea_ibfk_1` FOREIGN KEY (`aa_colorscheme`) REFERENCES `tb_colorscheme` (`cs_id`);

--
-- 限制表 `tb_user`
--
ALTER TABLE `tb_user`
  ADD CONSTRAINT `tb_user_ibfk_1` FOREIGN KEY (`u_avatar`) REFERENCES `tb_avatar` (`avatar_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
