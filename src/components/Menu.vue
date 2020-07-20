<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item mr-3">
                    <router-link class="btn btn-sm btn-flat btn-outline-light" to="/movies" exact>Filmes</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="btn btn-sm btn-flat btn-outline-light" to="/series" exact>Séries</router-link>
                </li>
            </ul>
            <div class="copyright my-2 my-lg-0">
                by Anderson Martins
            </div>
            </div>
        </div>
        </nav>
        <router-view/>
    </div>
</template>

<style>
    .btn { border-radius: 0; width: 150px; text-transform: uppercase; }
    .navbar-light { background: transparent !important; color: #ffffff; }
    .nav-item a:hover { color: #333333 !important; }
    a { color: #ffffff !important; }
    .router-link-active { background: #ffffff; }
    a.router-link-active { color: #333333 !important; font-weight: bold; }
    .copyright { font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: 12px; font-style: italic; color: #cccccc; }
</style>
