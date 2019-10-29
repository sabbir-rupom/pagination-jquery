<?php
$data = getData('data.json');

$method = $song = $artist = '';
$offset = $itemCount = 0;
$limit = 10;

if (!empty($_GET)) {
    $method = 'get';
} else if (!empty($_POST)) {
    $method = 'post';
    $song = !empty($_POST['song']) ? trim($_POST['song']) : '';
    $artist = !empty($_POST['artist']) ? trim($_POST['artist']) : '';

    $nArr = [];
    foreach ($data as $value) {
        if (!empty($song) && empty($artist)) {
            if (stristr($value['song'], $song)) {
                $nArr[] = $value;
            }
        } elseif (!empty($artist) && empty($song)) {
            if (stristr($value['artist'], $artist)) {
                $nArr[] = $value;
            }
        } elseif (!empty($artist) && !empty($song)) {
            if (stristr($value['artist'], $artist) && stristr($value['song'], $song)) {
                $nArr[] = $value;
            }
        } else {
            $nArr[] = $value;
        }
    }
    $data = $nArr;
}

$limit = isset($_REQUEST['limit']) ? intval($_REQUEST['limit']) : $limit;
$offset = isset($_REQUEST['offset']) ? intval($_REQUEST['offset']) : $offset;
$itemCount = count($data);
?>
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="UTF-8">
        <meta name="author" content="Sabbir Hossain Rupom">
        <meta name="description" content="Simple javascript pagination plugin using jquery and bootstrap CSS">
        <meta name="keywords" content="HTML,CSS,JSON,JavaScript,jQuery,Pagination,Dynamic Pagination">

        <!-- Load Bootstrap3 library css from CDN -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <style>
            /*
            * Simple CSS Styles
            */
            h1,h2,h3,h4,h5 {
                margin: 10px 0;
                padding: 0;
            }
            .t-head div {
                font-weight: bold;
                margin-bottom: 10px;
            }
            .row-item {
                padding: 5px 0;
                border-top: 1px solid #ccc;
            }
            .disabled {
                pointer-events: none;
            }
        </style>

        <!-- Load jQuery library script from CDN -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

        <!-- Load Bootstrap3 library script from CDN -->
        <!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>-->

        <!-- Load our pagination script from local source -->
        <script src="../pagination.min.js"></script>
    </head>
    <body>
        <header>
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-md-offset-3">
                        <h2>Simple Pagination Example</h2>
                        <h4><?= $method == 'post' ? 'Paginate items through form submission by post method' : 'Refresh page with limit & offset query string to paginate' ?></h4>
                        <h5>built in jQuery with bootstrap-3 pagination class</h5>
                    </div>
                </div>
            </div>
        </header>
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-md-offset-3">
                        <hr>
                        <?php
                        if ($method === 'post') {
                            ?>
                            <form action="example.process.php" method="POST" id="myForm">
                                <div class="row">
                                    <div class="col-md-5">Song name:&nbsp;<input type="text" name="song" placeholder="search songs ..." value="<?= $song ?>"></div>
                                    <div class="col-md-5">Artist name:&nbsp;<input type="text" name="artist" placeholder="search artists ..." value="<?= $artist ?>"></div>
                                    <div class="col-md-2"><br><input type="submit" value="Submit"></div>
                                </div>
                            </form>
                            <?php
                        }
                        ?>
                        <h4>Various songs are listed below:</h4>
                        <div class="row t-head">
                            <div class="col-xs-1">#</div><div class="col-xs-5">Song</div><div class="col-xs-4">Artist</div><div class="col-xs-2">Year</div>
                        </div>
                        <?php
                        if (!empty($data)) {
                            foreach ($data as $key => $value) {
                                $c = ($key + 1);
                                if ($offset < $c && ($limit + $offset > $key)) {
                                    ?>
                                    <div class="row row-item">
                                        <div class="col-xs-1"><?= $c ?></div>
                                        <div class="col-xs-5"><?= $value['song'] ?></div>
                                        <div class="col-xs-4"><?= $value['artist'] ?></div>
                                        <div class="col-xs-2"><?= $value['year'] ?></div>
                                    </div>
                                    <?php
                                }
                            }

                            if ($itemCount > $limit) {
                                ?>
                                <div class="text-center">
                                    <!-- parent element for pagination menu list -->
                                    <ul class="pagination pagination-sm custom-pagination"></ul>
                                </div>

                                <?php
                            }
                        }
                        ?>

                        <!-- prepare necessary element attributes to pass parameters for pagination -->
                        <input type="hidden" id="itemCount" value="<?= $itemCount ?>">
                        <input type="hidden" id="pageLimit" value="<?= $limit ?>">
                        <input type="hidden" id="currentPage" value="<?= $offset === 0 ? 1 : floor($offset / $limit) + 1; ?>">
                    </div>
                </div>
            </div>
        </section>
        <footer>
            <script>
                $(document).ready(function () {
                    let itemLimit = parseInt($('#pageLimit').val());
                    let itemTotal = parseInt($('#itemCount').val());
                    let currentPage = parseInt($('#currentPage').val());

                    $('.custom-pagination').rpmPagination({
                        limit: itemLimit,
                        total: itemTotal,
                        currentPage: currentPage,
//                        domElement: '.row-item',
                        link: 'example.process.php',
                        refresh: true,
                        formElement: '<?= $method == 'post' ? '#myForm' : '' ?>'
                    });

                });
            </script>
        </footer>
    </body>
</html>

<?php

/**
 * Sample function for pagination data retrieval
 *
 * @param string $dataFile File source
 * @return array Data array for filling pagination items
 * @throws string Reason for error
 */
function getData($dataFile) {
    $data = [];
    try {
        // Check if any error found during data load from json file
        if (file_exists($dataFile) == false) {
            throw Exception('data file not exist');
        }
        $data = json_decode(file_get_contents($dataFile), true);
        if (empty($data)) {
            throw Exception('data file is empty');
        }
    } catch (Exception $exc) {
        die($exc->getTraceAsString());
    }

    return $data;
}
