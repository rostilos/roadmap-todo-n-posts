<?php

namespace Core;

use DateTime;

class Validator {

    /**
     * Dates validation.
     * 
     * @param array $dates A array of string representation of dates.
     * @param string $format The format that the passed in string. The same letters as for the date() can be used.
     *
     * @return bool  True if all dates are valid.
     * @access  public
     */
    public static function dates(array $dates, string $format = "Y-m-d"): bool {

        if (is_array($dates)) {

            foreach ($dates as $name => $date) {

                $d = DateTime::createFromFormat($format, $date);

                if ($d === false || $d->format($format) !== $date) {

                    return false;
                }
            }
            return true;
        }
    }

    /**
     * Empty values in data array validation.
     * 
     * @param array
     *
     * @return bool  True if all dates are valid.
     * @access  public
     */
    public static function isContainsEmptyValues(array $array): bool {
        return (in_array("", $array));
    }

}
