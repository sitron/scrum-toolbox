<?php
namespace Sitronnier\SmBoxBundle\Extension;

class ZebraTwigExtension extends \Twig_Extension {

    public function getFilters() {
        return array(
            'zebraCurrentDay'   => new \Twig_Filter_Method($this, 'zebraCurrentDay'),
            'zebraDay'   => new \Twig_Filter_Method($this, 'zebraDay'),
        );
    }

    /**
     * Transform a zebra url to show report for current day
     * @param string https://zebra.liip.ch/de/timesheet/report/?option_selector=&users%5B0%5D=163&users%5B1%5D=103&users%5B2%5D=142&projects%5B0%5D=1157&activities%5B0%5D=%2A&start=2011-11-30&end=2011-12-06
     */
    public function zebraCurrentDay($url) {
        $date = new \DateTime;
        $url = preg_replace('/(start=)(\d+-\d+-\d+)/', 'start=' . $date->format('Y-m-d'), $url);
        $url = preg_replace('/(end=)(\d+-\d+-\d+)/', 'end=' . $date->format('Y-m-d'), $url);
        return $url;
    }

    public function zebraDay($url, $date) {
        $url = preg_replace('/(start=)(\d+-\d+-\d+)/', 'start=' . $date->format('Y-m-d'), $url);
        $url = preg_replace('/(end=)(\d+-\d+-\d+)/', 'end=' . $date->format('Y-m-d'), $url);
        return $url;
    }

    public function getName()
    {
        return 'zebra_twig_extension';
    }
}

