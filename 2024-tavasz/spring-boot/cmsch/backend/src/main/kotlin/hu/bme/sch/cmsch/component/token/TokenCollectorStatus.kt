package hu.bme.sch.cmsch.component.token

enum class TokenCollectorStatus {
    SCANNED,
    ALREADY_SCANNED,
    WRONG,
    CANNOT_COLLECT,
    INACTIVE,
    QR_FIGHT_LEVEL_NOT_OPEN,
    QR_FIGHT_LEVEL_LOCKED,
    QR_FIGHT_TOWER_LOCKED,
    QR_FIGHT_TOTEM_LOCKED,
    QR_FIGHT_INTERNAL_ERROR,
    QR_TOWER_LOGGED,
    QR_TOWER_CAPTURED,
    QR_TOWER_ENSLAVED,
    QR_TOWER_ALREADY_ENSLAVED,
    QR_TOTEM_LOGGED,
    QR_TOTEM_ENSLAVED,
    QR_TOTEM_ALREADY_ENSLAVED
}