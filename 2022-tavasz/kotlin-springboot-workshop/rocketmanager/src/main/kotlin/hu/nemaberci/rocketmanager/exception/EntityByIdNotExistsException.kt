package hu.nemaberci.rocketmanager.exception

class EntityByIdNotExistsException(entityName: String, id: Long)
    : IllegalArgumentException("Entity of type $entityName and id $id does not exist") {
}