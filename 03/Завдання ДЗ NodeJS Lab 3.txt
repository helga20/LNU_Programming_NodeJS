/*
Програма має вміти упорядковувати файли.
Є два параметри input_root та output_root.
input_root - це шлях до директорії, яка містить файли та підпапки з файлами (рівень вкладеності не більше одиниці)
Зразок вхідних даних:
  input_root
        folder1
              mfile1.mp3
              mfile2.mp3
        folder2
              file1.avi
              file2.mkv
ступним правилом {folder_name}-{file_name}-{type}.{ext}, де type це music, films або other, а ext це розширення файлу.
Зразок вихідних даних:
  Output_root
        films
              fileZ.avi
              folder2-ffile1-fillms.avi
              folder2-ffile2-films.mkv
        music
              fileY.mp3
              folder1-mfile1-music.mp3
              folder1-mfile2-music.mp3
        other
              fileX.txt
Детальні умови:
            Реалізувати обробку файлів у вигляді стратегій (лінк на вікіпедію з зразком).
            Стратегії мають виконувати наступні правила перенесення та переіменовування файлів:
            Стратегія для аудіо файлів:
            1. Перемістити файл у одну з папок music/mp3 (mp3) music/lossless (flac, ape, cue, wav).
            2. Якщо файл розміщений в підпапці і має тип mp3 то створити аналогічну підпапку в music/mp3 і в неї помітити файли. Переіменувати файли у форматі {folder_name}-{file_name}.mp3
            3. Якщо файл розміщений в підпапці і має інший тип ніж mp3 то створити аналогічну підпапку в music/lossless і в неї помітити файли.
            4. Якщо файл розміщений в корені то перемістити його в одну з папок music/mp3 (mp3) music/lossless (flac, ape, cue, wav). Переіменувати файл у форматі to_sort_{filename}_music.{ext}
            Стратегія для відео файлів:
            1. Перемістити файли в папку films.
            2. При переміщені перетворити імена файлів за наступними правилами (те що зліва "->" перетворюється на те що справа, правила виконуються одночасно):
                "Harry.Potter.avi", "harry.potter.avi", "Harry_Potter.avi" -> "Harry Potter.avi"
                "Harry.Potter.Xdiv.avi", "Harry.Potter.fullhd.avi" -> "Harry Potter.avi"
                "Harry.Potter.2013.avi" -> "Harry Potter [2013].avi" (перевірка на роки, 1999, 2000, 2011 і тд. Рік має вказуватися 4-ма цифрами)
            Зразок:
                "harry.potter.Xdiv.2013.avi" -> "Harry Potter [2013].avi"
            Стратегія для фото файлів (png, jpg, jpeg, gif)
            1. Перемістити файли в папку images.
            2. Якщо файл розміщений в підпапці то створити аналогічну підпапку в images і в неї помістити файли. Переіменувати файли у форматі {folder_name}-{file_name}.mp3
            3. Якщо файл розміщений в корені то перемістити його в папку images/to_sort.
*/

const fs = require("fs");
const path = require("path");

function moveFile(sourcePath, destinationPath) {
  fs.renameSync(sourcePath, destinationPath);
}

function createDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function getFileExtension(fileName) {
  return path.extname(fileName).toLowerCase();
}

function transformVideoFileName(fileName) {
  const transformations = [
    { regex: /(\.|\b)([A-Za-z]+)/g, replacement: " $2" },
    { regex: /\.[A-Za-z]{3}$/, replacement: "" },
    { regex: /\.\d{4}\./, replacement: " [$&]" },
  ];

  let transformedFileName = fileName;
  for (const transformation of transformations) {
    transformedFileName = transformedFileName.replace(
      transformation.regex,
      transformation.replacement
    );
  }

  return transformedFileName.trim() + ".avi";
}

function processAudioFile(filePath, outputRoot) {
  const fileName = path.basename(filePath);
  const fileExtension = getFileExtension(fileName);

  let destinationFolder = "";

  if (fileExtension === ".mp3") {
    const parentDirectory = path.dirname(filePath);
    if (parentDirectory !== inputRoot) {
      const parentFolderName = path.basename(parentDirectory);
      destinationFolder = path.join(
        outputRoot,
        "music",
        "mp3",
        parentFolderName
      );
      createDirectory(destinationFolder);

      moveFile(
        filePath,
        path.join(destinationFolder, parentFolderName + "-" + fileName)
      );
      return;
    }
  }

  if (fileExtension === ".mp3") {
    destinationFolder = path.join(outputRoot, "music", "mp3");
  } else if ([".flac", ".ape", ".cue", ".wav"].includes(fileExtension)) {
    destinationFolder = path.join(outputRoot, "music", "lossless");
  }

  createDirectory(destinationFolder);
  moveFile(filePath, path.join(destinationFolder, fileName));
}

function processVideoFile(filePath, outputRoot) {
  const fileName = path.basename(filePath);

  const transformedFileName = transformVideoFileName(fileName);

  const destinationFolder = path.join(outputRoot, "films");
  createDirectory(destinationFolder);
  moveFile(filePath, path.join(destinationFolder, transformedFileName));
}

function processImageFile(filePath, outputRoot) {
  const fileName = path.basename(filePath);
  const parentDirectory = path.dirname(filePath);

  let destinationFolder = "";

  if (parentDirectory !== inputRoot) {
    const parentFolderName = path.basename(parentDirectory);
    destinationFolder = path.join(outputRoot, "images", parentFolderName);
    createDirectory(destinationFolder);
    moveFile(
      filePath,
      path.join(destinationFolder, parentFolderName + "-" + fileName)
    );
    return;
  }

  destinationFolder = path.join(outputRoot, "images", "to_sort");
  createDirectory(destinationFolder);
  moveFile(filePath, path.join(destinationFolder, fileName));
}

function processOtherFile(filePath, outputRoot) {
  const fileName = path.basename(filePath);
  const parentDirectory = path.dirname(filePath);

  let destinationFolder = "";

  if (parentDirectory !== inputRoot) {
    const parentFolderName = path.basename(parentDirectory);
    destinationFolder = path.join(outputRoot, "other", parentFolderName);
    createDirectory(destinationFolder);
    moveFile(filePath, path.join(destinationFolder, fileName));
    return;
  }

  destinationFolder = path.join(outputRoot, "other");
  createDirectory(destinationFolder);
  moveFile(filePath, path.join(destinationFolder, fileName));
}

function readdirSyncRecursive(directoryPath) {
  let fileNames = [];
  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      fileNames.push(filePath);
    } else if (stat.isDirectory()) {
      fileNames = fileNames.concat(readdirSyncRecursive(filePath));
    }
  }

  return fileNames;
}

function sortFiles(inputRoot, outputRoot) {
  const files = readdirSyncRecursive(inputRoot);
  console.log(files);
  for (const file of files) {
    if (fs.statSync(file).isFile()) {
      const fileExtension = getFileExtension(file);
      if ([".mp3", ".flac", ".ape", ".cue", ".wav"].includes(fileExtension)) {
        processAudioFile(file, outputRoot);
      } else if ([".avi", ".mp4", ".mkv"].includes(fileExtension)) {
        processVideoFile(file, outputRoot);
      } else if ([".png", ".jpg", ".jpeg", ".gif"].includes(fileExtension)) {
        processImageFile(file, outputRoot);
      } else {
        processOtherFile(file, outputRoot);
      }
    }
  }
}

const inputRoot =
  "./input_root";
const outputRoot =
  "./output_root";
sortFiles(inputRoot, outputRoot);
