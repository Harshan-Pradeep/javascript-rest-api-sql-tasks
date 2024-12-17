-- 3.2. Select names of all empty test groups (group name starts with "TEST-")

SELECT [name]
FROM [group]
WHERE [name] LIKE 'TEST-%'
AND NOT EXISTS (
    SELECT 1 
    FROM groupMembership 
    WHERE groupMembership.groupID = [group].id
);

-- 3.3. Select user first names and last names for the users that have 'Victor' as a first name and are not members of any test groups

SELECT DISTINCT u.firstName, u.lastName
FROM [user] u
WHERE u.firstName = 'Victor'
AND NOT EXISTS (
    SELECT 1
    FROM groupMembership gm
    JOIN [group] g ON gm.groupID = g.id
    WHERE gm.userID = u.id
    AND g.name LIKE 'TEST-%'
);

-- 3.4. Select users and groups for which user was created before the group for which he(she) is member of

SELECT u.firstName, u.lastName, g.name as groupName, 
       u.created as userCreated, g.created as groupCreated
FROM [user] u
JOIN groupMembership gm ON u.id = gm.userID
JOIN [group] g ON gm.groupID = g.id
WHERE u.created < g.created;