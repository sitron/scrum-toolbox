<?php

namespace Sitronnier\MyUserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class SitronnierMyUserBundle extends Bundle
{
    public function getParent()
    {
        return 'FOSUserBundle';
    }
}
